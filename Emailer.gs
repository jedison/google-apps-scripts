/* Send Confirmation Email with Google Forms */

function Initialize() {
  
  var triggers = ScriptApp.getScriptTriggers();
  
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  
  ScriptApp.newTrigger("SendConfirmationMail")
  .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
  .onFormSubmit()
  .create();
  
}

// This will show up as the sender's name
var sendername = sendername = "UPDATE WITH YOUR NAME";
// WHERE AND WHEN THE EVENT IS!!!
var location = "The EVENT will take place at:<br />LOCATION INFORMATION<br /><br />";
var transport = "(Public transportation: xxxxx)<br />";
var time = "DATE, starting at START TIME and ending about END TIME<br />";
// Optional but change the following variable to have a custom subject for Google Docs emails
var subject = "Registration Successful";

function SendConfirmationMail(e) {
  
  try {
    
    var ss = SpreadsheetApp.getActiveSheet();
    var columns;
    var message, textbody, sender;
    
    // This is your email address and you will be in the BCC
    var bcc = Session.getActiveUser().getEmail();
    
    // This is the body of the auto-reply
    message = "We have received your details.<br>Thanks!<br><br>";
    
    message += location;
    message += transport;
    message += time;
    
    ss = SpreadsheetApp.getActiveSheet();
    columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];
    
    // This is the submitter's email address
    sender = e.namedValues["Email"].toString();
    
    // Only include form values that are not blank
    for ( var keys in columns ) {
      var key = columns[keys];
      if ( e.namedValues[key]  &&  e.namedValues[key] != "" ) {
        message += key + ' : '+ e.namedValues[key] + "<br />"; 
      }
    }
    
    textbody = message.replace("<br>", "\n");
    
    GmailApp.sendEmail(sender, subject, textbody, 
                       {bcc: bcc, name: sendername, htmlBody: message});
    
    Logger.log("sent email to " + sender);
  } catch (e) {
    Logger.log(e.toString());
  }
  
}

function resendConfirmationEmails() {
  
  var ss = SpreadsheetApp.getActiveSheet();
  var header = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];
  var rows = ss.getRange(2, 1, ss.getLastRow(), ss.getLastColumn()).getValues();
  var message, textbody, sender;
  
  // This is your email address and you will be in the BCC
  var bcc = Session.getActiveUser().getEmail();
//  Logger.log("bcc=" + bcc);
//  Logger.log("subject=" + subject);
//  Logger.log("rows=" + rows.length);
  
  for ( var j = 0; j < rows.length; j++ ) {
    sender = "";
    // This is the body of the auto-reply
    message = "We have received your details.<br>Thanks!<br><br>";
    // message = "Thank you for your Democrats Abroad Belgium event registration.<br /><br />";
    message += location;
    message += transport;
    message += time;
    
//      Logger.log("message=" + message);
    // Only include form values that are not blank
    for ( var i = 0; i < rows[j].length; i++ ) {
      var key =  header[i];
      var value = rows[j][i];
//      Logger.log("key=" + key);
      if ( value  &&  value != "" ) {
        if (key == "Email") {
          sender = value;
//          Logger.log("sender=" + sender);
        } else {
          message += key + ' : '+ value + "<br />"; 
        }
//        Logger.log("key=" + key + ", value=" + value);
      }
      // This is the submitter's email address
    }
//    Logger.log(message);
    
    textbody = message.replace("<br>", "\n");
    if (sender != "") {   
      GmailApp.sendEmail(sender, subject, textbody, 
                         {bcc: bcc, name: sendername, htmlBody: message});
//      Logger.log(sender);
//      Logger.log(subject);
//      Logger.log(message);
    }
    
  }
}
