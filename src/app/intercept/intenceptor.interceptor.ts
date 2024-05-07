import {HttpInterceptorFn} from '@angular/common/http';
import {jwtDecode} from "jwt-decode";

export const intenceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token')
  const url = req.url;

  const authReq = req.clone({
    setHeaders: {
      Authorization: `${token}`
    }
  });

  if (!url.includes('login') || url.includes('register')) {
    if (token) {
      let decodeToken = jwtDecode(token)
      const isValid =
        decodeToken && decodeToken.exp
          ? decodeToken.exp < Date.now() / 1000
          : false;
      if (isValid) {
        console.log("EXPIRED")
        window.location.href = '/login';
      }
    }
  }
  return next(authReq);
};
