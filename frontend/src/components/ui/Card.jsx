export default function Card({ as: As = "div", className = "", ...props }) {
  return (
    <As
      className={["rounded-lg border bg-white", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}

