export default function TaskCard({ title, children }) {
  return (
    <div className="theme-panel p-6 rounded-3xl shadow-lg border hover:shadow-2xl transition-all duration-300">

      <h2 className="text-lg font-bold text-purple-800 mb-5">
        {title}
      </h2>

      <div className="text-gray-600">
        {children}
      </div>

    </div>
  );
}