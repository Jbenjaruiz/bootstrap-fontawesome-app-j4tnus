import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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

  constructor(private excelService: ExcelService, private datePipe: DatePipe) {}

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
        })
        .catch((error) => {
          console.error('Error leyendo el archivo:', error);
        });
    }
  }

  onRowButtonClick(row: SurveyData): void {
    console.log(row);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
