export default function Button({
  text = "Sample Button",
  onClick = () => {},
  color = "bg-accent",
}: {
  text?: string;
  onClick?: any;
  color?: string;
}) {
  return (
    <button
      className="highlight-transparent tap99 w-full select-none rounded-xl bg-blue-600 p-4 text-sm font-medium text-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
