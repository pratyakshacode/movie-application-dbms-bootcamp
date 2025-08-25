import React, { useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string; // id or unique identifier
}

interface TextInputProps {
  label: string;
  placeholder: string;
  options: Option[];
  inputValue: string;
  setInputValue: (value: string) => void;
  onSelect?: (value: Option) => void; // callback when option selected
}

const TextInput = ({
  label,
  placeholder,
  options = [],
  inputValue,
  setInputValue,
  onSelect,
}: TextInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter((opt) =>
      opt.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setIsOpen(true);
  };

  const handleSelect = (option: Option) => {
    setInputValue(option.label); // show label in input
    setIsOpen(false);
    onSelect?.(option); // return the full option {label, value}
  };

  return (
    <div className="w-3/5 text-white" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-3 py-2 bg-gray-500 outline-none rounded-lg"
        />

        {/* Dropdown */}
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-10 w-full bg-gray-500 rounded-lg mt-1 max-h-48 overflow-auto shadow-lg">
            {filteredOptions.map((opt, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(opt)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-400"
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}

        {isOpen && filteredOptions.length === 0 && (
          <div className="absolute z-10 w-full bg-gray-500 rounded-lg mt-1 p-2 text-sm text-gray-300 shadow-lg">
            No results found
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;