interface CheckboxGroupProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

// Grupo de checkboxes usado para os campos "multi-select" (necessidades da
// startup e área de interesse do investidor). `selected` guarda os valores
// marcados; ao clicar, adiciona ou remove o item da lista.
export default function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
  error,
}: CheckboxGroupProps) {
  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div className="mb-4">
      <span className="mb-2 block font-medium text-deepgreen">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={`cursor-pointer select-none rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                checked
                  ? 'border-deepgreen bg-deepgreen text-white'
                  : 'border-deepgreen/30 bg-lightgray text-deepgreen hover:bg-sage/30'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
