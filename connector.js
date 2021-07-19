function fillSheet(values, sheetName) {
  var colLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ", "BA", "BB", "BC", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BK", "BL", "BM", "BN", "BO", "BP", "BQ", "BR", "BS", "BT", "BU", "BV", "BW", "BX", "BY", "BZ", "CA", "CB", "CC", "CD", "CE", "CF", "CG", "CH", "CI", "CJ", "CK", "CL", "CM", "CN", "CO", "CP", "CQ", "CR", "CS", "CT", "CU", "CV", "CW", "CX", "CY", "CZ", "DA", "DB", "DC", "DD", "DE", "DF", "DG", "DH", "DI", "DJ", "DK", "DL", "DM", "DN", "DO", "DP", "DQ", "DR", "DS", "DT", "DU", "DV", "DW", "DX", "DY", "DZ", "EA", "EB", "EC", "ED", "EE", "EF", "EG", "EH", "EI", "EJ", "EK", "EL", "EM", "EN", "EO", "EP", "EQ", "ER", "ES", "ET", "EU", "EV", "EW", "EX", "EY", "EZ", "FA", "FB", "FC", "FD", "FE", "FF", "FG", "FH", "FI", "FJ", "FK", "FL", "FM", "FN", "FO", "FP", "FQ", "FR", "FS", "FT", "FU", "FV", "FW", "FX", "FY", "FZ", "GA", "GB", "GC", "GD", "GE", "GF", "GG", "GH", "GI", "GJ", "GK", "GL", "GM", "GN", "GO", "GP", "GQ", "GR", "GS", "GT", "GU", "GV", "GW", "GX", "GY", "GZ", "HA", "HB", "HC", "HD", "HE", "HF", "HG", "HH", "HI", "HJ", "HK", "HL", "HM", "HN", "HO", "HP", "HQ", "HR", "HS", "HT", "HU", "HV", "HW", "HX", "HY", "HZ", "IA", "IB", "IC", "ID", "IE", "IF", "IG", "IH", "II", "IJ", "IK", "IL", "IM", "IN", "IO", "IP", "IQ", "IR", "IS", "IT", "IU", "IV", "IW", "IX", "IY", "IZ", "JA", "JB", "JC", "JD", "JE", "JF", "JG", "JH", "JI", "JJ", "JK", "JL", "JM", "JN", "JO", "JP", "JQ", "JR", "JS", "JT", "JU", "JV", "JW", "JX", "JY", "JZ"];
  var sheet;
  if (sheetName == false) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  } else {
    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  }
  sheet.clear({
    contentsOnly: true
  });
  var rows = values;
  var header = rows[0];
  var minCol = colLetters[0];
  var maxCol = colLetters[header.length - 1];
  var minRow = 1;
  var maxRow = rows.length;
  var range = sheet.getRange(minCol + minRow + ":" + maxCol + maxRow);
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}
function getToken(baseUrl, username, password) {
  var sessionUrl = baseUrl + "api/session";
  var options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify({
      username: username,
      password: password
    })
  };
  var response;
  try {
    response = UrlFetchApp.fetch(sessionUrl, options);
  } catch (e) {
    throw (e);
  }
  var token = JSON.parse(response).id;
  return token;
}
function myFunction() {
  var token = getToken('https://bi.houm.com/','USER@houm.com','PASSWORD')
  var sheet = SpreadsheetApp.getActive().getSheets()[0];
  var data = {
    // the data that you will be using
  };
  var options = {
    "method": "post",
    "headers": {
      "Content-Type": "application/json",
      "X-Metabase-Session": token
    },
    "muteHttpExceptions": true
  };
  var response = UrlFetchApp.fetch('https://bi.houm.com/api/card/CARD_NUMBER/query/csv', options);
  var values = Utilities.parseCsv(response.getContentText());
  fillSheet(values, 'SHEET_NAME');
}