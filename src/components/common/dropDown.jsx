
const DropDown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value} key={option.value + " " + option.label}>{option.label}</option>
          ))}
        </select>
      </label>
    );
  };
export default DropDown;