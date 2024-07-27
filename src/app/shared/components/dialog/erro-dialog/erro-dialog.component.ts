import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-erro-dialog',
  standalone: true,
  imports: [],
  templateUrl: './erro-dialog.component.html',
  styleUrl: './erro-dialog.component.css'
})
export class ErroDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { mensagemErro: string },
    public dialogRef: MatDialogRef<ErroDialogComponent>
  ) {}

  fecharDialog(): void {
    this.dialogRef.close();
  }
}


