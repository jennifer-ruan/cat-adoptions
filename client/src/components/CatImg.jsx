export default function CatImg({ cat, index = 0, className = null }) {
  if (!cat.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover aspect-square";
  }
  return (
    <img
      className={className}
      src={"http://localhost:4000/uploads/" + cat.photos[0]}
    />
  );
}
