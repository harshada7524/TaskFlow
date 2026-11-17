export default function TaskCard({ title, children }) {
  return (
    <div className="bg-white/95 p-6 rounded-3xl shadow-lg border border-purple-100 hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      <h2 className="text-lg font-bold text-purple-800 mb-5">
        {title}
      </h2>

      <div className="text-gray-600">
        {children}
      </div>
    </div>
  );
}