import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar.css";

const CalendarView = ({ selectedDate, onSelectDate, calendarData, formatDateKey }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <Calendar
        onChange={onSelectDate}
        value={selectedDate}
        className="w-full border-0 p-5"
        tileContent={({ date, view }) => {
          if (view !== "month") return null;
          const key = formatDateKey(date);
          const hasPeople = calendarData[key]?.people?.length > 0;

          if (!hasPeople) return null;

          return (
            <div className="mt-1 flex justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#44A77D]" />
            </div>
          );
        }}
      />
    </div>
  );
};

export default CalendarView;
