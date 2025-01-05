import { apiEndpoint } from "../../config/apis/tfg-api";
import { User } from "../../infrastructure/interfaces/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth-response";

const returnUserToken = async (data: AuthResponse) => {

    const user: User = {
        id: data.id,
        email: data.email,
        firstName: data.fullName,
        lastName: '',
        role: data.role,
    }

    return {
        user,
        token: data.token
    }
}

export const authLogin = async (email: string, password: string) => {
    try {
        const { data } = await apiEndpoint.post<AuthResponse>('/auth/login', {
            email,
            password
        });

        return returnUserToken(data);

    } catch (error) {
        console.log(error)
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await apiEndpoint.get<AuthResponse>('/auth/check-status');

        return returnUserToken(data);

    } catch (error) {
        return null;
    }
}

export const authRegister = async (email: string, password: string, fullName: string) => {
    try {
        const { data } = await apiEndpoint.post<AuthResponse>('/auth/register', {
            email,
            password,
            fullName
        });

        return returnUserToken(data);

    } catch (error) {
        return null;
    }
}