# Kebab butikken

This project is a webpage that is able to recieve issues from customers which then can be read and handled by employees.

Live site: https://kebab-buttiken.netlify.app/

### This project uses:

- React installed with Vite
- React Router
- Firebase Cloud Firestore

### Firebase structure

- There is one collection called "reports".
- This collection have all the documents, which I like to call, a report.
- This report has the data:
  - assigned
  - date
  - description
  - email
  - priority

All of these fields have strings as values.<br>
The structure when working with firebase is this: <br>
collection(reports) -> document(report)<br><br>
Then there are comments.<br>
A comment is another collection, but the collection is inside of the report which I like to call "comments".<br>
It is structured like this:<br>
collection(reports) -> document(report) -> collection(comments) -> document(comment)<br>
The comment has two fields/data as strings:

- comment
- date

### The general structure of the frontend is:

- main.jsx to handle routing
- App.jsx as a front-page with two links, one to report and one to see a list of cases.
- firebase.js which handles the firebase config. It requires an .env file which I deceitfully did not provide you.
- index.css which handles all of the CSS with simplicity/chaos - you decide.

Then there are two folders where the idea is that the reciever folder handles all of the cases that are recieved, and the sender folder handles all the logic to send a case.

#### Sender:

- Report.jsx, this is basically a form. When one submits to it, the data will be sent to firebase and react-router will navigate the person to the "Thank you" page
- ThankYou.jsx

#### Reciever:

- ReportList.jsx, this is used as a hub for all cases. It recieves a collection from firebase which it loops through in the render.
- ReportOverview.jsx, this is the most "advanced" component. It uses react-router to find the ID/slug in the URL, which is then used to fetch a single document. This document can then be edited via firebase's updateDoc() function. It also handles comments which are stored in another collection inside the document.

## More about ReportOverview

It uses the updateReport function which takes in two arguments. One is for the key of the data/field that is to be updated and the other is the variable to update it with.<br>
Whenever this is updated, the data of the whole document will be refetched and rerendered to make sure that the end-user sees that it was succesful (because I did not include any error messages).

## Improvements

- Add Tailwind or other forms of CSS structure to save future developers pain.
- Add firebase "Realtime Database" or similar to save data and the environment.
- Update functions to be more clear, reusable and concise.
- Make a lot of components for consistancy for future development throughout the webpage (e.g the "Go Back" link, textarea, input fields, buttons etc.)
