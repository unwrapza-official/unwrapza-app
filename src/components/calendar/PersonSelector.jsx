const PersonSelector = ({ allPeople, selectedIds, onSelect }) => {
  const available = allPeople.filter((p) => !selectedIds.includes(p.id));

  if (available.length === 0) {
    return (
      <p className="text-xs text-gray-400">
        All people in your list are already linked to this date.
      </p>
    );
  }

  const handleChange = (e) => {
    const value = e.target.value;
    if (!value) return;
    onSelect(value);
    e.target.value = "";
  };

  return (
    <select
      onChange={handleChange}
      defaultValue=""
      className="border border-gray-200 rounded-md px-2 py-1 text-sm w-full mb-2 bg-white"
    >
      <option value="" disabled>
        Select a person...
      </option>
      {available.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name} ({p.relation})
        </option>
      ))}
    </select>
  );
};

export default PersonSelector;
