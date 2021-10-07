// questions
var one = {
  title: "Arrays in JavaScript can be used to store ___________",
  answers: [
    "1. Numbers & Strings",
    "2. Other Arrays",
    "3. Booleans",
    "4. All of the above",
  ],
  correct: 4,
};
var two = {
  title: "Commonly used datatypes DO not include",
  answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
  correct: 3,
};
var three = {
  title:
    "String values must be enclosed between _______ when being assigned to variables",
  answers: ["1. Commas", "2. Curly Brackets", "3. Quotes", "4. Parenthisis"],
  correct: 3,
};
var four = {
  title: "The condition in an if/else statement is enclosed between",
  answers: [
    "1. Curly Braces",
    "2. Quotes",
    "3. Square Brackets",
    "4. Parenthisis",
  ],
  correct: 4,
};
var five = {
  title:
    "A very useful tool used during development and debugging for printing content to the debugger is:",
  answers: [
    "1. JavaScript",
    "2. terminal/bash",
    "3. for loops",
    "4. console.log",
  ],
  correct: 4,
};

var currQuestion = one;
var currTime = 0;
var store = window.localStorage;
var initialArray;
var blockClick = false;

// link up all the document elements to variables to be
// able to access them in javascript
var questionTitleEl = document.getElementById("question");
var btnQ1El = document.getElementById("btn-q1");
var btnQ2El = document.getElementById("btn-q2");
var btnQ3El = document.getElementById("btn-q3");
var btnQ4El = document.getElementById("btn-q4");
var timerEl = document.getElementById("timer");
var ansEl = document.getElementById("answer");
var finalscoreSpanEl = document.getElementById("final-score-span");
var sectionIntroEl = document.getElementById("intro");
var sectionQuestionsEl = document.getElementById("questions");
var sectionResultEl = document.getElementById("result");
var sectionHighScoresEl = document.getElementById("high-scores");
var btnStartQuiz = document.getElementById("start-quiz");
var btnRestartQuiz = document.getElementById("restart");
var btnSaveScore = document.getElementById("save");
var btnResetScore = document.getElementById("clear");
var initialEl = document.getElementById("initials");
var orderlistHighScoresEl = document.getElementById("score-list");

// Question array just to make it easy to store questions
// shuffle them for each round and to get the next question
var questionArr = {
  currQuestionIndex: 0,
  questions: [],
  // Durstenfeld shuffle
  shuffleQuestions: function () {
    for (var i = this.questions.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.questions[i];
      this.questions[i] = this.questions[j];
      this.questions[j] = temp;
    }
    this.currQuestionIndex = 0;
  },
  // gets the next question in the array or returns null when no more
  getNextQuestion: function () {
    if (this.currQuestionIndex >= this.questions.length) {
      this.currQuestionIndex = 0;
      return null;
    } else {
      this.currQuestionIndex++;
      return this.questions[this.currQuestionIndex - 1];
    }
  },
};

// Initialize - push the questions into the
// question array and hide a bunch of sections
var init = function () {
  questionArr.questions.push(one);
  questionArr.questions.push(two);
  questionArr.questions.push(three);
  questionArr.questions.push(four);
  questionArr.questions.push(five);
  updateHighScores();

  sectionQuestionsEl.style.display = "none";
  sectionResultEl.style.display = "none";
  sectionHighScoresEl.style.display = "none";
  ansEl.style.display = "none";
};

// read scores from local store
var updateHighScores = function () {
  // read local store for highscores array object
  initialArray = JSON.parse(store.getItem("highscores"));
  // if it is first use the just set to an empty array object
  if (initialArray == null) {
    initialArray = [];
    store.setItem("highscores", JSON.stringify(initialArray));
  }
  // sort the scores from high to low
  initialArray.sort((a, b) => b.score - a.score);
  // remove any text already in the ordered list and then loop through the array to add the scores as list items
  orderlistHighScoresEl.textContent = "";
  initialArray.forEach(function (value) {
    var node = document.createElement("li");
    var txtNode = document.createTextNode(value.initial + " - " + value.score);
    node.appendChild(txtNode);
    orderlistHighScoresEl.appendChild(node);
  });
};

// Checks to see whether the correct answer button was clicked
// by comparing the answer button id to the correct answer number
// This will break if the answer button id's are changed
// Where the wrong answer is selected the time penalty is applied
// uses set timeout to display whether the answer was correct or wrong
// for one second. Checks whether all questions are done to move to
// display all done screen
const handleQuestionButtonClick = function (event) {
  // displaying 'correct' or 'wrong' so block input clicks until
  // moving to next question
  if (blockClick) {
    return;
  }
  // compare the dataset stored response clicked to the correct answer
  if (event.target.dataset.response == currQuestion.correct) {
    console.log("correct");
    ansEl.textContent = "Correct!";
    ansEl.style.display = "inline";
  } else {
    console.log("wrong");
    ansEl.textContent = "Wrong!";
    ansEl.style.display = "inline";
    currTime -= 10;
    timerEl.textContent = currTime;
  }
  // grab the next question data
  currQuestion = questionArr.getNextQuestion();
  // block clicks while notifying of correct or wrong
  blockClick = true;
  if (currQuestion != null) {
    setTimeout(function () {
      // unblock clicks and display the next question after a 1 sec pause
      blockClick = false;
      displayCurrentQuestion();
    }, 1000);
  } else {
    // no more questions
    stopTimer();
    setTimeout(function () {
      // unblock clicks and display all done screen after 1 sec pause
      blockClick = false;
      displayAllDone();
    }, 1000);
  }
};

// add question button handlers to the question buttons
btnQ1El.addEventListener("click", handleQuestionButtonClick);
btnQ2El.addEventListener("click", handleQuestionButtonClick);
btnQ3El.addEventListener("click", handleQuestionButtonClick);
btnQ4El.addEventListener("click", handleQuestionButtonClick);

// Displays the current question and the possible answers
// for the user to select their response
// question buttons have their text updated with possible
// answers
var displayCurrentQuestion = function () {
  ansEl.style.display = "none";
  sectionIntroEl.style.display = "none";
  sectionHighScoresEl.style.display = "none";
  sectionQuestionsEl.style.display = "flex";
  questionTitleEl.textContent = currQuestion.title;
  btnQ1El.textContent = currQuestion.answers[0];
  btnQ2El.textContent = currQuestion.answers[1];
  btnQ3El.textContent = currQuestion.answers[2];
  btnQ4El.textContent = currQuestion.answers[3];
};

// Hides and displays elements to move to the
// all done screen ready for user to store their
// initials. Final score is the time left on the
// countdown timer
var displayAllDone = function () {
  sectionHighScoresEl.style.display = "none";
  ansEl.style.display = "none";
  sectionQuestionsEl.style.display = "none";
  sectionResultEl.style.display = "flex";
  finalscoreSpanEl.textContent = currTime;
};

// hide everything except high scores
var displayHighScores = function () {
  stopTimer();
  resetTimer();
  ansEl.style.display = "none";
  sectionQuestionsEl.style.display = "none";
  sectionResultEl.style.display = "none";
  sectionIntroEl.style.display = "none";
  sectionHighScoresEl.style.display = "flex";
};

// resets the timer to it's start value
var resetTimer = function () {
  timerEl.style.display = "inline";
  currTime = 75;
};

// starts the timer, keeps track of the
// interval so that it can be stopped later
// and updates the timer value on the screen
// Where the timer reaches zero it is stopped
// and move to all done screen
var timerInterval;
var startTimer = function () {
  timerInterval = setInterval(function () {
    currTime--;
    timerEl.textContent = currTime;
    console.log(currTime);
    if (currTime === 0) {
      stopTimer();
      displayAllDone();
    }
  }, 1000);
};

// Uses stored timerInterval to
// stop the timer
var stopTimer = function () {
  clearInterval(timerInterval);
};

// This handles the first click on the start quiz button
// It will reset and start the timer, shuffle questions and
// start to display questions
const startQuizHandler = function () {
  questionArr.shuffleQuestions();
  currQuestion = questionArr.getNextQuestion();
  resetTimer();
  startTimer();
  displayCurrentQuestion();
};

// Save the score to local storage
const saveScoreHandler = function () {
  // guess we should check initials doesn't go to long but just trim for the moment
  const initials = initialEl.value.trim();
  initialEl.value = "";
  initialArray = JSON.parse(store.getItem("highscores"));
  initialArray.push({ initial: initials, score: currTime });
  store.setItem("highscores", JSON.stringify(initialArray));
  updateHighScores();
  displayHighScores();
};

// Clear local storage to empty and update page with cleared scores
const resetHighScoreHandler = function () {
  store.setItem("highscores", JSON.stringify([]));
  updateHighScores();
};

// add event listeners and handlers to clicks
btnStartQuiz.addEventListener("click", startQuizHandler);
btnRestartQuiz.addEventListener("click", startQuizHandler);
btnSaveScore.addEventListener("click", saveScoreHandler);
btnResetScore.addEventListener("click", resetHighScoreHandler);

// Initialize page to hide everything and show intro and reset all
init();
