import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import CalendarView from "../../components/calendar/CalendarView";
import DaySidebar from "../../components/calendar/DaySidebar";

const AccountCalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [people, setPeople] = useState([]); // [{id, name, relation}]
  const [calendarData, setCalendarData] = useState({}); // { [dateKey]: { people: [], gifts: {} } }
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const formatDateKey = (date) => {
    return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
  };

  useEffect(() => {
    const load = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // 1) load people
      const peopleRef = collection(db, "users", user.uid, "people");
      const peopleSnap = await getDocs(peopleRef);
      const peopleList = peopleSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setPeople(peopleList);

      // 2) load calendar items
      const calRef = collection(db, "users", user.uid, "calendar");
      const calSnap = await getDocs(calRef);

      const data = {};
      calSnap.docs.forEach((d) => {
        data[d.id] = d.data();
      });
      setCalendarData(data);
    };

    load();
  }, []);

  const openDay = (date) => {
    setSelectedDate(date);
    setSidebarOpen(true);
  };

  const closeSidebar = () => setSidebarOpen(false);

  const getEntryForSelectedDate = () => {
    const key = formatDateKey(selectedDate);
    return calendarData[key] || { date: key, people: [], gifts: {} };
  };

  const upsertCalendarEntry = async (updater) => {
    const user = auth.currentUser;
    if (!user) return;
    const key = formatDateKey(selectedDate);
    const ref = doc(db, "users", user.uid, "calendar", key);

    const existing = calendarData[key] || { date: key, people: [], gifts: {} };
    const updated = updater({ ...existing, people: [...(existing.people || [])], gifts: { ...(existing.gifts || {}) } });

    await setDoc(ref, updated);

    setCalendarData((prev) => ({
      ...prev,
      [key]: updated,
    }));
  };

  const handleAddPerson = async (personId) => {
    await upsertCalendarEntry((entry) => {
      if (!entry.people.includes(personId)) {
        entry.people.push(personId);
      }
      return entry;
    });
  };

  const handleRemovePerson = async (personId) => {
    await upsertCalendarEntry((entry) => {
      entry.people = entry.people.filter((id) => id !== personId);
      if (entry.gifts && entry.gifts[personId]) {
        delete entry.gifts[personId];
      }
      return entry;
    });
  };

  const handleUpdateGift = async (personId, giftNote) => {
    await upsertCalendarEntry((entry) => {
      if (!entry.gifts) entry.gifts = {};
      entry.gifts[personId] = giftNote;
      return entry;
    });
  };

  if (!auth.currentUser) {
    return (
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Birthday & Gift Calendar 🎁</h1>
        <p className="text-gray-600">Log in to use your personal gift calendar.</p>
      </div>
    );
  }

  const selectedEntry = getEntryForSelectedDate();

  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-4">Birthday & Gift Calendar 🎁</h1>
        <p className="text-gray-600 mb-4">
          Select a date and link people + gift ideas, so you never forget a special moment.
        </p>

        <CalendarView
          selectedDate={selectedDate}
          onSelectDate={openDay}
          calendarData={calendarData}
          formatDateKey={formatDateKey}
        />
      </div>

      <DaySidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        selectedDate={selectedDate}
        people={people}
        entry={selectedEntry}
        onAddPerson={handleAddPerson}
        onRemovePerson={handleRemovePerson}
        onUpdateGift={handleUpdateGift}
      />
    </div>
  );
};

export default AccountCalendarPage;
