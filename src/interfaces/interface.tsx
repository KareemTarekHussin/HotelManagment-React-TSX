export interface ChangePasswordProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ErrorProps {
  message: string;
  name: string;
  request: {
    status: number;
    statusText: string;
  };
  response: {
    data: { success: boolean; message: string; data: string | null };
  };
  status: number;
  statusText: string;
}

export interface ToastTypeProps {
  showToast: (
    type: "success" | "error" | "warning" | "info",
    message: string
  ) => void;
}
