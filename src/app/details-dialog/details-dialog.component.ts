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
        duration: 2000,
        panelClass: ['dialog-snackbar'], // Asignamos nuestra clase personalizada
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

  /**
   * Determina la clase CSS a aplicar según la escala y el valor.
   * @param type El tipo de escala ('EE', 'DD', o 'PA')
   * @param value El puntaje numérico
   * @returns El nombre de la clase CSS ('level-green', 'level-orange', 'level-red')
   */
  getLevelClass(type: 'EE' | 'DD' | 'PA', value: any): string {
    const score = Number(value); // Convertimos el valor a número por si viene como texto

    switch (type) {
      case 'EE': // Agotamiento Emocional
        if (score <= 18) return 'level-green';
        if (score >= 19 && score <= 26) return 'level-orange';
        if (score >= 27) return 'level-red';
        break;

      case 'DD': // Despersonalización
        if (score <= 5) return 'level-green';
        if (score >= 6 && score <= 9) return 'level-orange';
        if (score >= 10) return 'level-red';
        break;

      case 'PA': // Realización Personal (lógica de color invertida)
        if (score <= 25) return 'level-red';
        if (score >= 26 && score <= 31) return 'level-orange';
        if (score >= 32) return 'level-green';
        break;
    }
    return ''; // Devuelve una clase vacía si no coincide ninguna regla
  }

  // --- FIN DE LA NUEVA MODIFICACIÓN ---

  onClose(): void {
    this.dialogRef.close();
  }
}
