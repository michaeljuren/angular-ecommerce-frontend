import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const theEndpoint = environment.luv2shopApiUrl + '/orders';
    const secureEndpoints = [theEndpoint];

    const isSecure = secureEndpoints.some(url => req.url.includes(url));
    if (!isSecure) {
      return next.handle(req);
    }

    const token = sessionStorage.getItem('accessToken'); // Retrieve from sessionStorage

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    } else {
      console.warn('Access token not found in sessionStorage');
      return next.handle(req);
    }
  }
}

