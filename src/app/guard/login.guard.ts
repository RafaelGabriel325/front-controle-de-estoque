import {inject} from "@angular/core";
import {AutenticacaoService} from "../service/autenticacao.service";

export const loginAuthGuard = async (component: AutenticacaoService) => {
  return inject(AutenticacaoService).authenticateLogin();
};

