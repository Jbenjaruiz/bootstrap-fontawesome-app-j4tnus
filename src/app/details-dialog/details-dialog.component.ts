// details-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { SurveyData } from '../services/excel.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // <-- Importa MatSnackBar

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css'],
  providers: [DatePipe],
})
export class DetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SurveyData,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar // <-- Inyecta el servicio de SnackBar
  ) {}

  get finalizadoDate(): string {
    return (
      this.datePipe.transform(this.data.end, 'dd/MM/yyyy HH:mm') ||
      'No disponible'
    );
  }

  // NUEVA FUNCIÓN PARA COPIAR MANUALMENTE
  copyToClipboard(text: string) {
    // Creamos un elemento 'textarea' temporal
    const textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      // Usamos el comando 'copy' del navegador
      document.execCommand('copy');
      // Mostramos una notificación de éxito
      this._snackBar.open(`'${text}' copiado al portapapeles`, 'Cerrar', {
        duration: 2000, // Duración de 2 segundos
      });
    } catch (err) {
      console.error('Error al copiar texto: ', err);
      // Opcional: mostrar notificación de error
      this._snackBar.open('Error al intentar copiar', 'Cerrar', {
        duration: 2000,
      });
    }
    // Eliminamos el elemento temporal
    document.body.removeChild(textArea);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
