export default function TextInput({ className = "", ...props }) {
  return (
    <input
      className={["w-full h-10 px-3 rounded-md border", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

