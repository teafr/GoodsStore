import { Injectable, signal } from "@angular/core";
import { environment } from "../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { AuthUser } from "../models/auth-user.model";
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = environment.apiUrl + '/auth';
    private key = environment.key;
    currentUserSig = signal<AuthUser | null>(null);

    constructor(private http: HttpClient) {
        const savedUser = localStorage.getItem(this.key);
        if (savedUser) {
            this.currentUserSig.set(JSON.parse(savedUser));
        }
    }

    register(lastName: string, firstName: string, patronymic: string, email: string, password: string) : Observable<AuthUser> {
        return this.http.post<AuthUser>(`${this.baseUrl}/register`, { lastName, firstName, patronymic, email, password }).pipe(
            tap(user => {
                this.currentUserSig.set(user);
                localStorage.setItem(this.key, JSON.stringify(user));
            })
        );
    }
    login(email: string, password: string) : Observable<AuthUser> {
        return this.http.post<AuthUser>(`${this.baseUrl}/login`, { email, password }).pipe(
            tap(user => {
                this.currentUserSig.set(user);
                localStorage.setItem(this.key, JSON.stringify(user));
            })
        );
    }
    logout() : void {
        this.currentUserSig.set(null);
        localStorage.removeItem(this.key);
        console.log("User logged out");
    }
    isAuthenticated(): boolean {
        return this.currentUserSig() !== null;
    }
}