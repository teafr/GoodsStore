import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../environment/environment";

export const authInterceptor : HttpInterceptorFn = (request, next) => {
    const token = JSON.parse(localStorage.getItem(environment.key) ?? '').token;
    request = request.clone({
        setHeaders: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    });
    
    return next(request);
};