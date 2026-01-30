export default function Container({ size = "lg", className = "", children }) {
  const width =
    size === "sm" ? "max-w-md" : size === "md" ? "max-w-3xl" : "max-w-6xl";

  return (
    <div className={`mx-auto ${width} px-4 ${className}`.trim()}>
      {children}
    </div>
  );
}

