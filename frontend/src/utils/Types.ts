// Types.ts
export interface LoginModalProps {
  show: boolean;               
  handleClose: () => void;     
  onLogin: () => void;       
}

export interface WideNavBarProps {
  isLoggedIn: boolean;             
  onLoginClick: () => void;         
  onLogout: () => void;            
}
