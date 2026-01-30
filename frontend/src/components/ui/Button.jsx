export default function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center h-10 px-4 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-60";

  const styles =
    variant === "primary"
      ? "bg-black text-white"
      : variant === "danger"
        ? "text-red-600 hover:underline px-0 h-auto"
        : "border hover:bg-gray-50";

  const width = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={[base, styles, width, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

