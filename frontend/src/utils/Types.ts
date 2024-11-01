// Types.ts
export interface LoginModalProps {
  show: boolean;               // Control if the modal is visible
  handleClose: () => void;     // Function to close the modal
  onLogin: () => void;        // Optional function for login action
}

export interface WideNavBarProps {
  isLoggedIn: boolean;              // Indicates if the user is logged in
  onLoginClick: () => void;         // Function to handle login action
  onLogout: () => void;             // Function to handle logout action
}
