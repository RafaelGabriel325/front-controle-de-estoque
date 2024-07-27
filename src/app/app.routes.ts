import {Routes} from '@angular/router';
import {HomeComponent} from "./module/home/home.component";
import {LoginComponent} from "./module/login/login.component";
import {pageAuthGuard} from "./guard/page.guard";
import {loginAuthGuard} from "./guard/login.guard";
import {NaoEncontradoComponent} from "./module/nao-encontrado/nao-encontrado.component";
import {RegisterComponent} from "./module/register/register.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [loginAuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [pageAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    component: NaoEncontradoComponent
  }
]


