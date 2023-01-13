function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  console.log("choice", choice);
  console.log("answer", this.answer);
  return this.answer === choice;
};

//create questions
var questions = [
  new Question(
    "JavaScript supports",
    ["Functions", "XHTML", "CSS", "HTML"],
    "Functions"
  ),
  new Question(
    "Which language is used for styling web pages?",
    ["HTML", "JQuery", "CSS", "XML"],
    "CSS"
  ),
  new Question(
    "Which is not a JavaScript Framework?",
    ["Python Script", "JQuery", "Django", "NodeJS"],
    "Django"
  ),
  new Question(
    "Which is used for Connect To Database?",
    ["PHP", "HTML", "JS", "All"],
    "PHP"
  ),
  new Question(
    "JavaScript is a ",
    ["Language", "Programming Language", "Development", "All"],
    "Programming Language"
  ),
];

//we will play a quiz
//initial score is 0
//starting point is q1 => index 0
//load all the questions in the quiz

function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}

Quiz.prototype.isEnded = function () {
  return this.questionIndex === questions.length;
};

var quiz = new Quiz(questions);

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    //writing the question
    var element = document.getElementById("question");
    console.log("getQuestionByIndex", quiz.getQuestionByIndex());
    element.innerHTML = quiz.getQuestionByIndex().text;

    //show choices
    var choices = quiz.getQuestionByIndex().choices;

    for (let i = 0; i < choices.length; i++) {
      var spanEle = document.getElementById("choice" + i);
      spanEle.innerHTML = choices[i];

      handleOptionButton("btn" + i, choices[i]);
    }
  }

  //show progress
  showProgress();
}

function showProgress() {
  var footerelv = document.getElementById("progress");
  footerelv.innerHTML =
    "Question " + (quiz.questionIndex + 1) + " of " + questions.length;
}

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML +=
    "<h2 id=score>Your scores: " +
    quiz.score +
    ", your percentage is:: " +
    (quiz.score / questions.length) * 100 +
    "% </h2>";

  document.getElementById("quiz").innerHTML = gameOverHTML;
}

Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function (answer) {
  console.log("Inside checkOptionWithAnswer");
  if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
    quiz.score++;
  }
  this.questionIndex++;
};

function handleOptionButton(id, choice) {
  var button = document.getElementById(id);

  button.onclick = function () {
    console.log("Inside onclick event");
    console.log("choice: ", choice);
    //check the answer
    quiz.checkOptionWithAnswer(choice);
    //load the next question
    loadQuestions();
  };
}

loadQuestions();
