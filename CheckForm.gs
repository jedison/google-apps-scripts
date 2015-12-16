START_TIME   =  "2014-01-01 08:00";
CLOSE_TIME  =  "2014-11-20 20:30";
MAX_RESPONSES   =  "200";
MAX_ATTENDEES   =  "200";
 
/* Initialize the form, setup triggers */
function Initialize() {
  
  deleteTriggers_();
  
  if ((START_TIME !== "") && 
      ((new Date()).getTime() < parseDate_(START_TIME).getTime())) { 
    closeForm();
    ScriptApp.newTrigger("openForm").timeBased().at(parseDate_(START_TIME)).create();
  }
  
  if (CLOSE_TIME !== "") { 
    ScriptApp.newTrigger("closeForm").timeBased().at(parseDate_(CLOSE_TIME)).create(); 
  }
  
  if ( (MAX_RESPONSES !== "") ||  (MAX_ATTENDEES !== "") ) { 
    ScriptApp.newTrigger("checkLimit").forForm(FormApp.getActiveForm()).onFormSubmit().create();
  }
  
}
 
/* Delete any existing Triggers */
function deleteTriggers_() {  
  var triggers = ScriptApp.getScriptTriggers();  
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}
 
/* Send an email to the owner when the form is opened or closed */
function informUser_(subject) {
  var formURL = FormApp.getActiveForm().getPublishedUrl();
  MailApp.sendEmail(Session.getActiveUser().getEmail(), subject, formURL);  
}
 
/* Open form to accept responses */
function openForm() {
  var form = FormApp.getActiveForm();
  form.setAcceptingResponses(true);
  informUser_("Your Google Form is now accepting responses");
}
 
/* Close form from accepting reponses */
function closeForm() {  
  var form = FormApp.getActiveForm();
  form.setAcceptingResponses(false);
  deleteTriggers_();
  informUser_("Your Google Form is no longer accepting responses");
}
 
/* If total number of responses >= limit, Close form */
function checkLimit() {
  
  var responses = FormApp.getActiveForm().getResponses();
  var count = 0;
  Logger.log('responses = %s ', responses.length ); 
  for ( var i = 0; i < responses.length; i++) {
    var itemResponses = responses[i].getItemResponses();
    // HARD CODING: UGLY! TIMESTAMP is ignored, it seems.
    var attendees = Number( itemResponses[3].getResponse() );
    count += attendees;
    Logger.log('At %s, found response %s', i, attendees ); 
  }
  Logger.log('Counted %s attendees', count ); 
  
  if ( ( FormApp.getActiveForm().getResponses().length >= MAX_RESPONSES )  || ( count >= MAX_ATTENDEES ) ) {
    closeForm();
  }  
}
 
/* Parse the date/time for creating time triggers */
function parseDate_(d) {
  return new Date(d.substr(0,4), d.substr(5,2)-1, d.substr(8,2), d.substr(11,2), d.substr(14,2));
}
