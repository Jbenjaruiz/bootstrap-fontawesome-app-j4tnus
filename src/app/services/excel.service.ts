import * as XLSX from 'xlsx';

export interface SurveyData {
  [key: string]: any;
  EE: number;
  DD: number;
  PA: number;
}

export class ExcelService {
  constructor() {}

  readExcel(file: File): Promise<SurveyData[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });

        // Process the data
        const headers = jsonData[0];
        const rows = jsonData.slice(1);

        const result: SurveyData[] = rows.map((row) => {
          const rowData: any = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index] ?? null; // Use null-safe access
          });

          // Calculate EE, DD, and PA
          rowData.EE = this.sumColumns(rowData, headers, 'EE1', 'EE9');
          rowData.DD = this.sumColumns(rowData, headers, 'DD1', 'DD5');
          rowData.PA = this.sumColumns(rowData, headers, 'PA1', 'PA8');

          return rowData as SurveyData;
        });

        resolve(result);
      };

      reader.onerror = (error) => reject(error);

      reader.readAsArrayBuffer(file);
    });
  }

  private sumColumns(
    data: any,
    headers: string[],
    startCol: string,
    endCol: string
  ): number {
    const startIndex = headers.indexOf(startCol);
    const endIndex = headers.indexOf(endCol);
    let sum = 0;

    for (let i = startIndex; i <= endIndex; i++) {
      const value = Number(data[headers[i]]) || 0;
      if (!isNaN(value)) {
        sum += value;
      }
    }

    return sum;
  }
}
