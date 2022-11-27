# Supernova Quiz App

The app is live on: 
-> https://shubhamkumbhakar.github.io/supernova, 
-> https://quiz-supernova.netlify.app

This project is created using React 18
The package dependencies added are:
1) react-lottie
2) axios

To run the app in your local
### Clone the repository and `npm i` -> `npm start` to start the app



## Components Diagram

There are mainly 3 components used in this app and they are rendered according to the state: currentScreen.
1. Start Screen component
2. Quiz Screen component
3. ScoreCard Screen component



## Start Screen component
This consists of a random gif in the background and START QUIZ button at the centre. On click of this button, quiz start as per the the sequence of questions.

## Quiz Screen component
This component renders each question of the worksheet one by one. Allows user to match the left and right columns and check their correctness as per the provided answer sheet.
1. It takes the left and right column of each question and arranges them column wise.
2. On click of left and right option one after another, it matches or couples them and put them at the top of the stack.
3. Same way it decouples them in the other way round.
4. On match of every option, it allows the user to check the answer.
5. On click of next button, the component rerenders with the next question.

## ScoreCard Component
This component evaluates the total correct options marked by user and shows the summary of correctness attempted by the user.
The user can restart the quiz from here by clicking the restart icon from here. 


## Inside App.js
On mount of App.js , the questions data is fetched from backend api: https://supernova-api.herokuapp.com/worksheets/1 which sets the state for rendering questions by the Quiz component.

