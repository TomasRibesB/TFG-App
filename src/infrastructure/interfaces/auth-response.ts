import { Role } from "../enums/roles";

export interface AuthResponse {
    id:       number;
    email:    string;
    fullName: string;
    isActive: boolean;
    role:    Role;
    token:    string;
}
