import { create } from "zustand";
import { User } from "../../infrastructure/interfaces/user";
import { AuthStatus } from "../../infrastructure/interfaces/auth-status";
import { authCheckStatus, authLogin, authRegister } from "../../services/auth/auth";
import { StorageAdapter } from "../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    user?: User;
    token?: string;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, name: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }

        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'authenticated', token: resp.token, user: resp.user });

        return true;
    },
    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }
        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'authenticated', token: resp.token, user: resp.user });

    },
    logout: async () => {
        StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    },

    register: async (email: string, password: string, name: string) => {
        const resp = await authRegister(email, password, name);
        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }

        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'authenticated', token: resp.token, user: resp.user });

        return true;
    }
}));