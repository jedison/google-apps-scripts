# google-apps-scripts

I use Google Forms for event registration, and the notification email from Google is nice, but I want to be able to send an email to people after they’ve registered, possibly including information which is not on the generally available form.

## Emailer.gs
Here are the steps involved:

1. From your Google Form, be sure that you have a field called “Email” where the submitter will input their email address.
1. Save your Google Form responses in a separate spreadsheet, open that sheet and choose the Tools –> Script Editor.
1. Include this Google Script into the script editor and save the script (floppy drive icon).
1. Inside the Script Editor, choose Run — Initialize and authorize the script to send emails on your behalf.
When anyone submits the form, they’ll get an confirmation email in HTML. You will be included in the BCC.

## CheckForm.gs
Another useful script, check if the maximum number of responses has been received, and, if so, closing the form (also opening and closing on particular date/time).
