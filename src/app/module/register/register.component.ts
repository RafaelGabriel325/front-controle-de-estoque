import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrarService } from "../../service/registrar.service";
import { IUser } from "../../interface/IUser";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { v4 as uuidv4 } from 'uuid';
import {PrimeNgImportModule} from "../../shared/ prime-ng-import.module";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, PrimeNgImportModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName: string = '';
  username: string = '';
  password: string = '';

  constructor(private registrarService: RegistrarService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const user: IUser = {
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        enable: true,
        fullName: this.fullName,
        password: this.password,
        username: this.username,
        ui: uuidv4(),
      };

      this.registrarService.cadastrarTabUser(user).subscribe(
        response => {
          console.log('Usuário cadastrado com sucesso:', response);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Erro ao cadastrar usuário:', error);
        }
      );
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
