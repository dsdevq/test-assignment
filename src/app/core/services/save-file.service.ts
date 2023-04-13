import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { Table } from 'primeng/table';
import { writeFile, utils } from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface IJsPDF extends jsPDF {
  lastAutoTable: {
    finalY: number;
  };
}

@Injectable({ providedIn: 'root' })
export class SaveFileService {
  constructor() {}

  public saveAsExcel(table: Table, chart: Chart) {
    // Get the table data
    const tableData = table.value;

    // Convert the chart data to an array of objects
    const chartDataArray = chart.data.datasets.reduce((acc, dataset) => {
      const data = dataset.data.map((value, index) => ({
        label: chart.data.labels[index],
        value,
      }));
      return [...acc, ...data];
    }, []);

    // Create a worksheet for the table data
    const tableWorksheet = utils.json_to_sheet(tableData);

    // Create a worksheet for the chart data
    const chartWorksheet = utils.json_to_sheet(chartDataArray);

    // Create a workbook and add the worksheets to it
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, tableWorksheet, 'Table');
    utils.book_append_sheet(workbook, chartWorksheet, 'Chart');

    // Save the workbook as a file
    writeFile(workbook, 'table_with_chart.xlsx');
  }

  public saveAsPDF(table: Table, image: string) {
    const doc = new jsPDF();

    // Generate table data
    const { headerRows, bodyRows } = this.generateTableData(table);

    // Add the table to the PDF document
    autoTable(doc, {
      head: headerRows,
      body: bodyRows,
    });

    // Add the chart image to the PDF document
    doc.addImage(
      image,
      'PNG',
      10,
      (doc as IJsPDF).lastAutoTable.finalY + 10,
      190,
      100
    );

    // Save the PDF file
    doc.save('table-and-chart.pdf');
  }
  private generateTableData(table: Table) {
    // Get the table columns and data
    const columns = table.columns;
    const data = table.value;

    // Create the header row
    const headerRows = [columns.map((column) => column.header)];

    // Create the body rows
    const bodyRows = data.map((row) => columns.map((col) => row[col.field]));

    // Return the table data
    return { headerRows, bodyRows };
  }
}
