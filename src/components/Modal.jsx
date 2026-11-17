export default function Modal({
  isOpen,
  onClose,
  title,
  children
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

        <h2 className="text-xl font-bold mb-4">
          {title}
        </h2>

        <div className="mb-5 text-gray-600">
          {children}
        </div>

        <button
          onClick={onClose}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl"
        >
          Close
        </button>

      </div>
    </div>
  );
}