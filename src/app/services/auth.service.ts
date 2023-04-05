import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${environment.API_URL}/api/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.apiUrl}/login`, { email, password } )
      .pipe(tap((resp) => this.tokenService.saveToken(resp.access_token)));
  }

  getProfile() {
    // let headers = new HttpHeaders();
    // headers.set('Authorization' , `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/profile` , { context : checkTime()})
    // , {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     // 'Content-type' : 'application/json'
    //   },
    };
}
