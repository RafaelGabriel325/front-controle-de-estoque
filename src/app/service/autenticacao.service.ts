import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ILogin from "../interface/ILogin";
import IToken from "../interface/IToken";
import {BASE_URL} from "./produto.service";
import {Router} from "@angular/router";
import {interval, map} from "rxjs";
import {jwtDecode} from "jwt-decode";


@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  signIn(login: ILogin) {
    const refreshToken = localStorage.getItem('refreshToken')
    const username = localStorage.getItem('username');

    if (!refreshToken && !username) {
      return this.httpClient.post<IToken>(BASE_URL + "auth/sign-in", login);
    } else {
      const headers = new HttpHeaders().set('Authorization', `"Bearer ${refreshToken}"`);
      return this.httpClient.put<IToken>(BASE_URL + `auth/refresh-token/${username}`, null, {headers})
    }
  }

  removeAccessToken(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authenticated');

    this.router.navigate(['']);
  }

  removeRefreshToken(): void {
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('username')
  }

  signOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('username');
  }

  authenticatedPage() {
    interval().subscribe(() => {
        if (localStorage.getItem('authenticated') === 'true') {
          return true
        } else {
          this.router.navigate(['']);
          return false
        }
      }
    );
  }

  authenticateLogin() {
    interval().subscribe(() => {
        if (localStorage.getItem('authenticated') === 'true') {
          this.router.navigate(['/home']);
          return true
        } else {
          return false
        }
      }
    );
  }
  decodeAccessToken(): any | null {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken;
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        return null;
      }
    }
    return null;
  }
}
