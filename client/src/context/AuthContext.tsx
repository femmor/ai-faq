import { createContext, useState, type FC, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    token: string | null;
    role: string | null;
    login: (token: string) => void;
    logout: () => void;
}

interface JwtPayload {
    role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);



    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
        const decoded: JwtPayload = jwtDecode<JwtPayload>(newToken);
        setRole(decoded.role);
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
