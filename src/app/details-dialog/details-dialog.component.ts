// details-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { SurveyData } from '../services/excel.service'; // Asegúrate que la ruta a tu interfaz sea correcta

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css'],
  providers: [DatePipe], // Proveemos DatePipe para formatear la fecha aquí también
})
export class DetailsDialogComponent {
  // Injectamos MAT_DIALOG_DATA para recibir la información de la fila
  constructor(
    public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SurveyData,
    private datePipe: DatePipe
  ) {}

  // Función para formatear la fecha de finalización
  get finalizadoDate(): string {
    return (
      this.datePipe.transform(this.data.end, 'dd/MM/yyyy HH:mm') ||
      'No disponible'
    );
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
