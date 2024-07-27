import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from "../interface/IUser";

export const BASE_URL: string = "http://localhost:8080/api/auth/";

@Injectable({
  providedIn: 'root',
})
export class RegistrarService {
  constructor(private httpClient: HttpClient) {}

  cadastrarTabUser(user: IUser) {
    return this.httpClient.post<IUser>(BASE_URL + 'user/create', user);
  }
}
