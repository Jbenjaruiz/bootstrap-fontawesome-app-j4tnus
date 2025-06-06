// details-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { SurveyData } from '../services/excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar
  ) {}

  get finalizadoDate(): string {
    return (
      this.datePipe.transform(this.data.end, 'dd/MM/yyyy HH:mm') ||
      'No disponible'
    );
  }

  copyToClipboard(text: string) {
    // ... (tu función de copiar se queda igual)
  }

  // --- INICIO DE LA NUEVA MODIFICACIÓN ---

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
