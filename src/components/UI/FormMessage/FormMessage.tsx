import "./FormMessage.css";

interface FormMessageProps {
  type: "success" | "error";
  message: string;
}

export default function FormMessage({ type, message }: FormMessageProps) {
  if (!message) return null;

  const base = "mt-2 p-3 text-sm rounded";

  const styles =
    type === "success"
      ? "success-message"
      : "error-message";

  return <div className={`${base} ${styles}`}>{message}</div>;
}
