import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {AppHeaderComponent} from "./layout/app-header/app-header/app-header.component";
import {AppFooterComponent} from "./layout/app-footer/app-footer/app-footer.component";
import {HttpClientModule} from "@angular/common/http";
import {PrimeNGConfig} from "primeng/api";
import {PrimeNgImportModule} from "./shared/ prime-ng-import.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    RouterOutlet,
    AppHeaderComponent,
    AppFooterComponent,
    PrimeNgImportModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: String = "Controle de Estoque";
  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
