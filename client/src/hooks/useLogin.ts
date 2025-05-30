import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';

const useLogin = () => {
    const { login } = useAuth();

    return useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) throw new Error("Login failed");
            return res.json();
        },
        onSuccess: (data) => {
            login(data.token);
        },
        onError: (error) => {
            console.error("Login error:", error);
        }
    });
};

export default useLogin;