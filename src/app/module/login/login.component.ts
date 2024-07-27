import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ErroDialogComponent} from "../../shared/components/dialog/erro-dialog/erro-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AutenticacaoService} from "../../service/autenticacao.service";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import IToken from "../../interface/IToken";
import {PrimeNgImportModule} from "../../shared/ prime-ng-import.module";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ErroDialogComponent, PrimeNgImportModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    public dialog: MatDialog
  ) {
  }

  login() {
    this.autenticacaoService.signIn({
      username: this.usuario,
      password: this.senha
    }).subscribe({
        next: (token: IToken) => {
          token.accessToken;
          token.refreshToken;
          token.authenticated;
          localStorage.setItem("accessToken", token.accessToken);
          localStorage.setItem("refreshToken", token.refreshToken);
          localStorage.setItem("authenticated", String(token.authenticated));
          localStorage.setItem("username", token.username);

          this.autenticacaoService.decodeAccessToken();

          const expiresInMilliseconds = (new Date(token.expiration).getTime() - new Date(token.created).getTime());

          setTimeout(() => {
            this.autenticacaoService.removeAccessToken();
          }, expiresInMilliseconds);

          setTimeout(() => {
            this.autenticacaoService.removeRefreshToken();
          }, expiresInMilliseconds * 3);

          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.limparCampos();
          this.exibirDialogErro("Falha no login. Verifique suas credenciais.")
        }
      }
    );
  }

  logout() {
    this.autenticacaoService.signOut();
  }

  private limparCampos() {
    this.usuario = '';
    this.senha = '';
  }

  private exibirDialogErro(mensagem: string): void {
    this.dialog.open(ErroDialogComponent, {
      data: {mensagemErro: mensagem},
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

