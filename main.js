var SpreadSheetID = "1Yk6gTs7ETao4AJUHReb5GiVjgEeNJR2DSid0Emn-Yz4"
var SheetName = "Sheet1"


function getData(email_sheet){
  var jo = {};
  var dataArray = [];
// collecting data from 2nd Row , 1st column to last row and last    // column sheet.getLastRow()-1
  var rows = email_sheet.getRange(2,1,email_sheet.getLastRow()-1, email_sheet.getLastColumn()).getValues();

  // console.log(rows);

  for(var i = 0, l= rows.length; i<l ; i++){
    var dataRow = rows[i];
    var record = {};
    record['incubator'] = dataRow[0];
    record['initials'] = dataRow[1];
    record['email'] = dataRow[2];
    record['last cleaned'] = dataRow[3];
    record['next clean'] = dataRow[4];
    dataArray.push(record);
  }
  jo = dataArray;
  var result = JSON.stringify(jo);
return jo;
}


function IncSchedule() {
  var ss = SpreadsheetApp.openById(SpreadSheetID);
  var inc_sched = ss.getSheetByName(SheetName);

  var email_json = getData(inc_sched);

  const now = new Date();
  const MILLS_PER_DAY = 1000 * 60 * 60 * 24;
  var plus_week = new Date(now.getTime() + 6*MILLS_PER_DAY)


  // console.log(now);
  // console.log(plus_week);
  // console.log(email_json[0]);
  // console.log(email_json[0]['next clean']);
  
  // var dataRange = inc_sched.getRange('A:A').getValues();
  var dataRange = inc_sched.getRange(2,1,inc_sched.getLastRow()-1, inc_sched.getLastColumn()).getValues();


  // l should be number of rows
  for(var i = 0, l= dataRange.length; i<l ; i++){
    if (email_json[i]['next clean'] < plus_week){
      // put email stuff in here

      previously = email_json[i]['last cleaned'];
      incubator = email_json[i]['incubator'];


      MailApp.sendEmail({to: email_json[i].email, subject: "clean incubator", htmlBody: "Please clean incubator " + incubator + " this week (or update the google sheet if you have cleaned it this month: https://docs.google.com/spreadsheets/d/1Yk6gTs7ETao4AJUHReb5GiVjgEeNJR2DSid0Emn-Yz4/edit#gid=0). It was last cleaned: " + Utilities.formatDate(previously, 'America/New_York', 'MMMM dd, yyyy'), noReply:true})

      // console.log("within a weeek");
    }
  }

}
