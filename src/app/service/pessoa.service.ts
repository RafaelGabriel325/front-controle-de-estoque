import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import IPessoa from "../interface/IPessoa";

export const BASE_URI: string = "http://localhost:8080/api/"

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  constructor(private httpClient: HttpClient) {
  }

  obterPessoa() {
    const headers = this.getHeaders();
    return this.httpClient.get<IPessoa[]>(BASE_URI + `pessoa/`, { headers });
  }

  private getHeaders() {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
