import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import IProduto from '../../interface/IProduto';
import { ProdutoService } from '../../service/produto.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TipoProdutoService } from '../../service/tipoProduto.service';
import ITipoProduto from '../../interface/ITipoProduto';
import { PessoaService } from '../../service/pessoa.service';
import IPessoa from '../../interface/IPessoa';
import { AutenticacaoService } from '../../service/autenticacao.service';
import {PrimeNgImportModule} from "../../shared/prime-ng-import.module";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, PrimeNgImportModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  uuid = '';
  marca = '';
  quantidadePacote = 0;
  dataEntrega = new Date();
  tamanhoPacote = '';
  tipoProduto = '';
  pessoa = '';

  produtos$: Observable<IProduto[]> = new Observable<IProduto[]>();
  tiposProdutos$: Observable<ITipoProduto[]> = new Observable<ITipoProduto[]>();
  pessoas$: Observable<IPessoa[]> = new Observable<IPessoa[]>();

  totalQuantidadePacote: number = 0;
  quantidadePorTipo: { [key: string]: number } = {};
  quantidadePorPessoa: { [key: string]: number } = {};

  constructor(private produtoService: ProdutoService,
              private tipoProdutoService: TipoProdutoService,
              private autenticacaoService: AutenticacaoService,
              private pessoaService: PessoaService) {}

  ngOnInit() {
    this.obterProdutosCadastrados();
    this.obterTiposProdutosCadastrados();
    this.obterPessoas();
  }

  obterProdutosCadastrados() {
    this.produtos$ = this.produtoService.obterProduto();

    this.produtos$.subscribe(produtos => {
      this.totalQuantidadePacote = produtos.reduce((acc, produto) => acc + produto.quantidadePacote, 0);

      this.quantidadePorTipo = produtos.reduce((acc, produto) => {
        const tipoUuid = produto.tipoProduto.uuid;
        acc[tipoUuid] = (acc[tipoUuid] || 0) + produto.quantidadePacote;
        return acc;
      }, {} as { [key: string]: number });

      this.quantidadePorPessoa = produtos.reduce((acc, produto) => {
        const pessoaUuid = produto.pessoa.uuid;
        acc[pessoaUuid] = (acc[pessoaUuid] || 0) + produto.quantidadePacote;
        return acc;
      }, {} as { [key: string]: number });
    });
  }

  obterPessoas() {
    this.pessoas$ = this.pessoaService.obterPessoa();
  }

  obterTiposProdutosCadastrados() {
    this.tiposProdutos$ = this.tipoProdutoService.obterTipoProduto();
  }

  cadastrarProduto() {
    this.produtoService.cadastrarProduto({
      marca: this.marca,
      quantidadePacote: this.quantidadePacote,
      dataEntrega: new Date(this.dataEntrega),
      tamanhoPacote: this.tamanhoPacote,
      tipoProduto: {
        uuid: this.tipoProduto
      },
      pessoa: {
        uuid: this.pessoa
      }
    }).subscribe(_ => this.obterProdutosCadastrados());
    this.limparCampos();
    this.closeDialog();
  }

  atualizarProduto() {
    this.produtoService.editarProduto({
      uuid: this.uuid,
      marca: this.marca,
      quantidadePacote: this.quantidadePacote,
      dataEntrega: this.dataEntrega,
      tamanhoPacote: this.tamanhoPacote,
      tipoProduto: {
        uuid: this.tipoProduto
      },
      pessoa: {
        uuid: this.pessoa
      }
    }).subscribe(_ => this.obterProdutosCadastrados());
    this.limparCampos();
    this.closeDialog2();
  }

  removerProduto() {
    this.produtoService.removerProduto(this.uuid)
      .subscribe(_ => this.obterProdutosCadastrados());
    this.limparCampos();
    this.closeDialog3();
  }

  preencherCampos(produto: IProduto) {
    this.uuid = produto.uuid!.toString();
    this.marca = produto.marca;
    this.quantidadePacote = produto.quantidadePacote;
    this.dataEntrega = produto.dataEntrega;
    this.tamanhoPacote = produto.tamanhoPacote;
    this.tipoProduto = produto.tipoProduto.uuid;
    this.pessoa = produto.pessoa.uuid;
  }

  limparCampos() {
    this.marca = '';
    this.quantidadePacote = 0;
    this.dataEntrega = new Date();
    this.tamanhoPacote = '';
    this.tipoProduto = '';
    this.pessoa = '';
  }

  visible$: boolean = false;
  visible2$: boolean = false;
  visible3$: boolean = false;

  abrirDialogCadastroProduto() {
    this.visible$ = true;
  }

  abrirDialogAtualizacaoProduto(produto: IProduto) {
    this.visible2$ = true;
    this.preencherCampos(produto);
  }

  abrirDialogRemoverProduto(produto: IProduto) {
    this.visible3$ = true;
    this.preencherCampos(produto);
  }

  closeDialog() {
    this.visible$ = false;
  }

  closeDialog2() {
    this.visible2$ = false;
  }

  closeDialog3() {
    this.visible3$ = false;
  }

  logout() {
    this.autenticacaoService.signOut();
  }
}
