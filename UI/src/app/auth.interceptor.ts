import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { inject } from "@angular/core";
import { catchError, filter, finalize, ReplaySubject, switchMap, take, throwError } from "rxjs";

let isRefreshing = false;
const refreshedToken$ = new ReplaySubject<string>(1);

export const authInterceptor : HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();
  
  const url = request.url;
  const isAuthRefresh = url.endsWith('/auth/refresh');
  const isAuthLogin = url.endsWith('/auth/login');
  const isAuthRegister = url.endsWith('/auth/register');

  let req = request;
  if (token && !isAuthLogin && !isAuthRegister && !isAuthRefresh) {
    req = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
    
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (isAuthRefresh || isAuthLogin || isAuthRegister) {
      authService.logout();
      return throwError(() => error);
    }

    if (error.status !== 401 && error.status !== 403) {
      return throwError(() => error);
    }

    if (!isRefreshing) {
      isRefreshing = true;

      return authService.refreshTokens().pipe(
        switchMap((newToken) => {
          refreshedToken$.next(newToken);

          const retry = req.clone({
            setHeaders: { Authorization: `Bearer ${newToken}` },
          });
          return next(retry);
        }),
        catchError((refreshErr) => {
          authService.logout();
          return throwError(() => refreshErr);
        }),
        finalize(() => {
          isRefreshing = false;
        })
      );
    }
    
    return refreshedToken$.pipe(
      take(1),
      filter((t) => !!t),
      switchMap((t) => {
        return next(req.clone({
          setHeaders: { Authorization: `Bearer ${t}` },
        }));
      })
    );
  }));
};