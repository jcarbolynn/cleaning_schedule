var SpreadSheetID = "1Yk6gTs7ETao4AJUHReb5GiVjgEeNJR2DSid0Emn-Yz4"
var SheetName = "incubators"

// for html
// <script src="https://code.jquery.com/jquery-latest.min.js"></script>
// var script = document.createElement('script');
// script.src = 'https://code.jquery.com/jquery-3.6.3.min.js';
// // Check https://jquery.com/ for the current version
// // or //code.jquery.com/jquery-3.6.3.min.js
// document.getElementsByTagName('head')[0].appendChild(script);

function IncSchedule() {
  var ss = SpreadsheetApp.openById(SpreadSheetID);
  var inc_sched = ss.getSheetByName(SheetName);

  var incubators = getData(inc_sched);

  const now = new Date();
  const MILLS_PER_DAY = 1000 * 60 * 60 * 24;
  var plus_week = new Date(now.getTime() + 6*MILLS_PER_DAY)
  
  // var dataRange = inc_sched.getRange('A:A').getValues();
  var dataRange = inc_sched.getRange(2,1,inc_sched.getLastRow()-1, inc_sched.getLastColumn()).getValues();

  to_clean_list = [];
  
  // l should be number of rows
  for(var i = 0, l= dataRange.length; i<l ; i++){
    if (incubators[i]['next clean'] < plus_week){
      // put email stuff in here

      previously = incubators[i]['last cleaned'];
      incubator = incubators[i]['incubator'];
      person = incubators[i]['initials'];
      email = incubators[i]['email'];

      to_clean_list.push(incubators[i]);

      if (email != ""){
        MailApp.sendEmail({to: email, subject: "clean incubator" + incubator, htmlBody: "Please clean incubator " + incubator + " this week (or update the google sheet if you have cleaned it this month: https://docs.google.com/spreadsheets/d/1Yk6gTs7ETao4AJUHReb5GiVjgEeNJR2DSid0Emn-Yz4/edit#gid=0). It was last cleaned: " + Utilities.formatDate(previously, 'America/New_York', 'MMMM dd, yyyy'), noReply:true})
      }      
    }
  }

  // if (jQuery.isEmptyObject(to_clean_list)){
  //   console.log("not empty")
  // }
  
  if (Object.keys(to_clean_list).length != 0){
    MailApp.sendEmail({to: EMAIL,
                        subject: "incubators to clean",
                        htmlBody: printStuff(to_clean_list),
                        noReply:true})

    MailApp.sendEmail({to: EMAIL,
                      subject: "incubators to clean",
                      htmlBody: printStuff(to_clean_list),
                      noReply:true})
  }

}

function getData(incubator_schedule){
  var dataArray = [];
// collecting data from 2nd Row , 1st column to last row and last    // column sheet.getLastRow()-1
  var rows = incubator_schedule.getRange(2,1,incubator_schedule.getLastRow()-1, incubator_schedule.getLastColumn()).getValues();

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
  return dataArray;
}

function printStuff(incs){
  string = "<html><body><br><table border=1><tr><th>Person</th><th>Incubator</th><th>Next Clean Date</th></tr></br>";
  for (var i=0; i<incs.length; i++){
    string = string + "<tr>";

    temp = `<td> ${incs[i]['initials']} </td><td> ${incs[i]['incubator']}  </td><td> ${Utilities.formatDate(incs[i]['next clean'], 'America/New_York', 'MMMM dd, yyyy')}</td>`;
    string = string.concat(temp);
    
    string = string + "</tr>";
  }
  string = string + "</table></body></html>";
  return string;
}

