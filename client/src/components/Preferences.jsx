const preferenceOptions = [
  { icon: "https://img.icons8.com/tiny-glyph/16/cat.png", label: "Cats" },
  { icon: "https://img.icons8.com/tiny-glyph/16/dog.png", label: "Dogs" },
  {
    icon: "https://img.icons8.com/tiny-glyph/16/teddy-bear.png",
    label: "Children",
  },
];

export default function Preferences({ selected, onChange }) {
  function handleCheckboxClick(e) {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName != name)]);
    }
  }
  return (
    <>
      {preferenceOptions.map(({ icon, label }) => {
        return (
          <label
            className="cursor-pointer border p-4 flex rounded-2xl gap-2 items-center"
            key={label}
          >
            <input
              type="checkbox"
              name={label}
              onChange={handleCheckboxClick}
            />
            <img className="h-4" src={icon} />
            <span>{label}</span>
          </label>
        );
      })}
    </>
  );
}
