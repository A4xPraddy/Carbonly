import { useState } from "react";
import API from "../api/config";

function ActivityInput({ data, closeModal = () => {} }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubtype, setSelectedSubtype] = useState("");
  const [value, setValue] = useState(0);

  const currentType = data.find((d) => d.type === selectedType);

  const showSubtypeDropdown = currentType && currentType.subTypes.length > 1;

  const onSubmit = async (e) => {
    e.preventDefault();
    let multiplier =
      currentType.subTypes.length === 1
        ? currentType.subTypes[0].multiplier
        : currentType.subTypes.filter((e) => e.name === selectedSubtype)[0]
            .multiplier;

    try {
      await API.post("/activity", {
        type: selectedType,
        subType: selectedSubtype,
        consumption: parseFloat(value),
        co2: value * multiplier,
      });
      closeModal();
    } catch (e) {
      alert("Something went wrong");
    }
    resetInputs();
  };

  const resetInputs = () => {
    setSelectedType("");
    setSelectedSubtype("");
    setValue(0);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-4 bg-white w-fit px-8 py-8 shadow-md rounded-md text-black activity-input"
    >
      <div className="flex gap-6">
        <div className="flex flex-col gap-2">
          <label>Type</label>
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setSelectedSubtype("");
            }}
            required
          >
            <option value="">Select type</option>
            {data.map((item) => (
              <option key={item._id} value={item.type}>
                {item.type}
              </option>
            ))}
          </select>
        </div>

        {showSubtypeDropdown && (
          <div className="flex flex-col gap-2">
            <label>Subtype</label>
            <select
              required
              value={selectedSubtype}
              onChange={(e) => setSelectedSubtype(e.target.value)}
            >
              <option value="">Select subtype</option>
              {currentType.subTypes.map((sub) => (
                <option key={sub._id} value={sub.name}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label>Consumption ({currentType?.unit || "unit"})</label>
        <input
          required
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
      </div>
      <button
        type="submit"
        className="w-fit bg-heading cursor-pointer text-white px-6 py-3 rounded-md mt-4"
      >
        Create Activity +
      </button>
    </form>
  );
}

export default ActivityInput;
