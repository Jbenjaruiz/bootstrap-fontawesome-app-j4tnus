import { Component, OnInit } from '@angular/core';
import { faAngular, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { faBook, faCar } from '@fortawesome/free-solid-svg-icons';
import { ExcelService, SurveyData } from '../services/excel.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ExcelService],
})
export class ContentComponent implements OnInit {
  faAngular = faAngular;
  faFontAwesome = faFontAwesome;
  faBook = faBook;
  faCar = faCar;

  message: string = 'Burnout listado';
  surveyData: SurveyData[] = [];

  constructor(private excelService: ExcelService) {}

  ngOnInit() {}

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.excelService
        .readExcel(file)
        .then((data: SurveyData[]) => {
          this.surveyData = data; // Almacenar los datos leídos del archivo Excel
        })
        .catch((error) => {
          console.error('Error leyendo el archivo:', error);
        });
    }
  }
}
