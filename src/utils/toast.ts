import { toast } from "react-hot-toast";

export const fireToast = ({
  message,
  type = "success",
}: {
  message: string;
  type?: "success" | "error" | "loading";
}) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "loading":
      toast.loading(message);
      break;
    default:
      toast(message);
  }
};
