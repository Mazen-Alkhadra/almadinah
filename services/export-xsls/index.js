let BillSvc = require('../bill');
let msexcel = require('excel4node');

class ExportXSLS {
  async exportBill({billId}) {
    let billSvc = BillSvc.create();
    let {
      notic,
      at,
      customerFullName,
      finalTotal,
      serialNumber,
      records
    } = (await billSvc.getBillDetails({billId})).data;

    let excelWork = new msexcel.Workbook();
    let ws = excelWork.addWorksheet('bill', {
      sheetView: {
        rightToLeft: true,
        showGridLines: false
        }
      });
      let recHeaderStyle = excelWork.createStyle({
        font: {
          color: '#a52a2a',
          size: 12,
          bold: true
        },
        fill: {
          type: 'pattern',
          patternType: 'solid',
          //bgColor: '#e70e5d',
          fgColor: '#c3b8bc',         
        }
      });
  
      let recStyle = excelWork.createStyle({
        font: {
          size: 12,
          bold: true
        },
        fill: {
          type: 'pattern',
          patternType: 'solid',
          //bgColor: '#e70e5d',
          fgColor: '#c3eebc',         
        }
      });

    ws.cell(1, 1).string('التاريخ:');
    ws.cell(1, 2, 1, 3, true).string(`${at.toLocaleDateString()} ${at.toLocaleTimeString()}`);
    ws.cell(2, 1).string('الزبون:');
    ws.cell(2, 2, 2, 6, true).string(customerFullName);
    ws.cell(3, 1).string('البيان:');
    ws.cell(3, 2, 3, 6, true).string(notic);
    ws.cell(5, 1).string('نهائي الفاتورة:').style(recStyle);
    ws.cell(5, 2).number(finalTotal).style(recStyle);
    ws.cell(7, 1).string('التفصيل:');

    // records
    ws.cell(7, 2, 7, 6, true).string('البيان').style(recHeaderStyle);
    ws.cell(7, 7).string('الكمية').style(recHeaderStyle);
    ws.cell(7, 8).string('السعر').style(recHeaderStyle);
    ws.cell(7, 9).string('المجموع').style(recHeaderStyle);

    records.forEach((record, index) => {
      let recRow = 8 + index ;
      ws.cell(recRow, 2, recRow, 6, true).string(record.notice).style(recStyle);
      ws.cell(recRow, 7).number(record.quantity).style(recStyle);
      ws.cell(recRow, 8).number(record.unitPrice).style(recStyle);
      ws.cell(recRow, 9).number(record.quantity * record.unitPrice).style(recStyle);
    });
    
    let fileBuf = await excelWork.writeToBuffer();

    return {fileBuf, fileName: `${serialNumber}.xlsx`}
  }
}

module.exports = {
  create: () => new ExportXSLS
}