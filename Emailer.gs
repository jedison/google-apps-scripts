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
 
function SendConfirmationMail(e) {
    
    try {
        
        var ss, bcc, sendername, subject, columns;
        var message, value, textbody, sender;
        var location, transport, time;
        
        // This is your email address and you will be in the BCC
        bcc = Session.getActiveUser().getEmail();
        
        // Optional but change the following variable to have a custom subject for Google Docs emails

        // This will show up as the sender's name
         sendername = "UPDATE WITH YOUR NAME";

        // WHERE AND WHEN THE EVENT IS!!!
        location = "The EVENT will take place at:<br />LOCATION INFORMATION<br /><br />";
        transport = "(Public transportation: xxxxx)<br />";
        time = "DATE, starting at START TIME and ending about END TIME<br />";

        subject = "Registration Successful";
 
        // This is the body of the auto-reply
        message = "Thank you for your event registration.<br /><br />";
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
        
    } catch (e) {
        Logger.log(e.toString());
    }
 
}
