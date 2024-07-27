import ITipoProduto from "./ITipoProduto";
import IPessoa from "./IPessoa";

export default interface IProduto {
  uuid?: string;
  marca: string;
  quantidadePacote: number;
  dataEntrega: Date;
  tamanhoPacote: string;
  tipoProduto: ITipoProduto;
  pessoa: IPessoa;
}
