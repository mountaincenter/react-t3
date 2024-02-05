interface CustomAlertProps {
  message: string;
  type: "success" | "error" | "loading";
}

const CustomAlert = ({ message, type }: CustomAlertProps) => {
  let backgroundColor = type === "success" ? "bg-green-500" : "bg-red-500";
  if (type === "loading") {
    backgroundColor = "bg-blue-500";
  }
  return (
    <div
      className={`fixed left-1/2 top-5 z-50 flex -translate-x-1/2 transform items-center justify-center space-x-2 rounded px-4 py-2 shadow-lg  ${backgroundColor} text-white`}
    >
      <span>{message}</span>
    </div>
  );
};

export default CustomAlert;
