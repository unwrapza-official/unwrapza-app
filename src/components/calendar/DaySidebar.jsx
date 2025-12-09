import PersonSelector from "./PersonSelector";

const DaySidebar = ({
  open,
  onClose,
  selectedDate,
  people,
  entry,
  onAddPerson,
  onRemovePerson,
  onUpdateGift,
}) => {
  if (!selectedDate) return null;

  const dateLabel = selectedDate.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const selectedPeopleIds = entry.people || [];

  const peopleMap = people.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});

  return (
    <div
      className={`
        md:w-1/3 w-full bg-white rounded-2xl shadow-md p-4 
        border border-gray-100 
        ${open ? "opacity-100 translate-y-0" : "opacity-100 md:opacity-60"}
      `}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <h2 className="font-semibold text-lg">Details for this date</h2>
        <button
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-gray-700 md:hidden"
        >
          Close
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">{dateLabel}</p>

      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2">People on this date</h3>

        {selectedPeopleIds.length === 0 && (
          <p className="text-sm text-gray-500 mb-2">
            No people linked yet. Add someone from your list:
          </p>
        )}

        <PersonSelector
          allPeople={people}
          selectedIds={selectedPeopleIds}
          onSelect={onAddPerson}
        />

        <div className="mt-3 flex flex-col gap-3">
          {selectedPeopleIds.map((personId) => {
            const p = peopleMap[personId];
            if (!p) return null;

            const currentGift = entry.gifts?.[personId] || "";

            return (
              <div
                key={personId}
                className="border border-gray-200 rounded-lg p-3 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm text-gray-800">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-500">{p.relation}</p>
                  </div>
                  <button
                    onClick={() => onRemovePerson(personId)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">
                    Gift idea / link
                  </label>
                  <input
                    type="text"
                    defaultValue={currentGift}
                    onBlur={(e) => onUpdateGift(personId, e.target.value)}
                    placeholder="Type a gift idea or paste a product link..."
                    className="border border-gray-200 rounded-md px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-[#44A77D]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[11px] text-gray-400 mt-2">
        Tip: later kun je dit koppelen aan je Unwrapza wishlist of AI cadeausuggesties.
      </p>
    </div>
  );
};

export default DaySidebar;
