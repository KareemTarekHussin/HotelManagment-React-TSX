

export default interface AuthInterface {
  loginData?:{}|null,
  baseUrl?:string,
  requestHeaders:{
    Authorization: string,
  },
  getUserData : ()=>void,
}export interface ChangePasswordProps {
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

// ?==============>Useres<==============
export interface User {
  country: string;
  email: string;
  creationDate: string;
  id: number;
  imagePath: string | undefined;
  isActivated: boolean;
  userName: string;
  status: string;
  phoneNumber: string;
}

export interface ActiveUserData {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}
// ?==============>End Useres<==============
