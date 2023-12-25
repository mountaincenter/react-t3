interface CustomAlertProps {
  message: string;
  type: "success" | "error";
}

const CustomAlert = ({ message, type }: CustomAlertProps) => {
  return (
    <div
      className={`fixed left-1/2 top-5 z-50 flex -translate-x-1/2 transform items-center justify-center space-x-2 rounded px-4 py-2 shadow-lg ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <span>{message}</span>
    </div>
  );
};

export default CustomAlert;
