export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={["w-full min-h-28 px-3 py-2 rounded-md border", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

