import { User } from "./user.model";

export interface AuthUser extends User {
    token: string;
    refreshToken: string;
}