function cleanupOddContacts() {
  Logger.log('Started');
  var contacts = ContactsApp.getContacts();
//  var contacts = ContactsApp.getContacts('Contact', ContactsApp.Field.GIVEN_NAME);
  Logger.log('count=' + contacts.length);

  for (var i in contacts) {
    var givenName = contacts[i].getGivenName();
    Logger.log('givenName=' + givenName);
    if (givenName == 'Contact') {

//      Logger.log('Setting givenName to empty string');
//      contacts[i].setGivenName('');
      Logger.log('Setting givenName to null');
      contacts[i].setGivenName(null);

      givenName = contacts[i].getGivenName();
      Logger.log('givenName=' + givenName);
    }
//    var fullName = contacts[i].getFullName();
//    Logger.log('fullName=' + fullName);
  }
  Logger.log('Completed');
}
