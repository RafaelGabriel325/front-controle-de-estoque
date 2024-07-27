import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import IProduto from "../interface/IProduto";

export const BASE_URL: string = "http://localhost:8080/api/"


@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private httpClient: HttpClient) {
  }

  obterProduto() {
    const headers = this.getHeaders();
    return this.httpClient.get<IProduto[]>(BASE_URL + 'produto/', { headers });
  }

  cadastrarProduto(produto: IProduto) {
    const headers = this.getHeaders();
    return this.httpClient.post<IProduto>(BASE_URL + 'produto/create', produto, { headers });
  }

  editarProduto(produto: IProduto) {
    const headers = this.getHeaders();
    return this.httpClient.put<IProduto>(BASE_URL + `produto/update/${produto.uuid}`, produto, { headers });
  }

  removerProduto(uuid: string) {
    const headers = this.getHeaders();
    return this.httpClient.delete<void>(BASE_URL + `produto/delete/${uuid}`, { headers });
  }

  private getHeaders() {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
