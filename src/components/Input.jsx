export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = "text"
}) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-semibold text-ink">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl border border-line bg-white"
      />
    </div>
  );
}