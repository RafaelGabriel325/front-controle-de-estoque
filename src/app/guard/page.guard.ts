import {inject} from "@angular/core";
import {AutenticacaoService} from "../service/autenticacao.service";

export const pageAuthGuard = async (component: AutenticacaoService) => {
  return inject(AutenticacaoService).authenticatedPage();
};

