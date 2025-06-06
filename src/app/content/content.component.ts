import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { ExcelService, SurveyData } from '../services/excel.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ExcelService],
})
export class ContentComponent implements OnInit {
  displayedColumns: string[] = [
    'action',
    '_id',
    'Nombre_Completo',
    'EE',
    'DD',
    'PA',
    'Equipo',
    'Jefe_Inmediato',
    'Puesto',
    'Cometarios',
    'Finalizado',
  ];
  dataSource = new MatTableDataSource<SurveyData>();
  surveyData: SurveyData[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('fileInput') fileInput;

  constructor(
    private excelService: ExcelService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.excelService
        .readExcel(file)
        .then((data: SurveyData[]) => {
          this.dataSource.data = data; // Almacenar los datos leídos del archivo Excel
          if (this.sort) {
            // 2. Establecemos la columna activa para el ordenamiento.
            this.sort.active = '_id';
            // 3. Establecemos la dirección del ordenamiento a 'desc' (descendente).
            this.sort.direction = 'desc';
            // 4. Notificamos a la tabla que el ordenamiento ha cambiado.
            this.sort.sortChange.emit();
          }
        })
        .catch((error) => {
          console.error('Error leyendo el archivo:', error);
        });
    }
  }

  onRowButtonClick(row: SurveyData): void {
    this.dialog.open(DetailsDialogComponent, {
      width: '500px', // Define un ancho para el modal
      data: row, // Pasamos los datos completos de la fila al modal
    });
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
