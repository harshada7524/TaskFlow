export default function Button({
  children,
  variant = "primary",
  onClick,
  disabled = false
}) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    secondary: "bg-white text-ink border border-line",
    danger: "bg-red-600 text-white"
  };

  return (
    <button
      onClick={onClick}
      
      disabled={disabled}
      className={`px-4 py-2.5 rounded-xl font-semibold ${styles[variant]}`}
    >
      {children}
    </button>
  );
}