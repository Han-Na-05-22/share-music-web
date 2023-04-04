export interface LoginProps {
  className?: string;
}

export interface UserProps {
  creationTime?: any;
  displayName: string;
  email: string;
  name: string;
  phoneNumber: string;
  photoURL?: any;
}

export interface LoginStateProps {
  isLogin: boolean;
  isJoin: boolean;
}
