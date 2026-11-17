export default function Avatar({
  name = "User",
  image
}) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3">

      {image ? (
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-purple-100 text-brand flex items-center justify-center font-bold">
          {initials}
        </div>
      )}

      <span className="font-semibold text-ink">
        {name}
      </span>

    </div>
  );
}