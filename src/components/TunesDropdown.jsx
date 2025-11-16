function TunesDropdown({ options = [], onSelect }) {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Select Songs
      </button>
      <ul className="dropdown-menu">
        {options.map((opt) => (
          <li key={opt.label}>
            <button className="dropdown-item" type="button" onClick={() => onSelect && onSelect(opt.code)}>
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TunesDropdown;