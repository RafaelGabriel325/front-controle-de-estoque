import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import ITipoProduto from "../interface/ITipoProduto";

export const BASE_URI: string = "http://localhost:8080/api/"


@Injectable({
  providedIn: 'root',
})
export class TipoProdutoService {
  constructor(private httpClient: HttpClient) {
  }

  obterTipoProduto() {
    const headers = this.getHeaders();
    return this.httpClient.get<ITipoProduto[]>(BASE_URI + `tipo-produto/`, { headers });
  }

  private getHeaders() {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
