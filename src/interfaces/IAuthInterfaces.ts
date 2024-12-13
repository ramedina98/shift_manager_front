import { IEmailUsername, IUserNoId, INoUserIdandPasswordRequired, INoUserIdPasswordandFotoRequired, IUserPasswords} from "./IUser";

export interface IAuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    consultorio: number;
    setConsultorio: React.Dispatch<React.SetStateAction<number>>;
    status: boolean;
    errorMessage: string | null;
    setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
    successMessage: string | null;
    setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
    usernameEmails: IEmailUsername | any[];
    popUpNoti: string | null;
    setPopUpNoti: React.Dispatch<React.SetStateAction<string | null>>;
    newUserRegister: (newUser_data: IUserNoId) => Promise<void>;
    login: (email: string, password: string, num_consultorio: number) => Promise<void>;
    logout: () => Promise <void>;
    recoverPassword: (user_name: string) => Promise<void>;
    resetPassword: (token: string, newPass: string) => Promise<void>;
    userData: () => Promise<INoUserIdandPasswordRequired | undefined>;
    updateUserData: (userData: INoUserIdPasswordandFotoRequired) => Promise<void>;
    updatePassword: (passData: IUserPasswords) => Promise<void>;
}

export interface IProtectedRouteProps {
    children: React.ReactNode;
}