var one = {title:'Title1', answers:['11','12','13','14'], correct:1};
var two = {title:'Title2', answers:['21','22','23','24'], correct:2};
var three = {title:'Title3', answers:['31','32','33','34'], correct:3};
var four = {title:'Title4', answers:['41','42','43','44'], correct:4};

var currQuestion = one;
var currTime = 0;

var questionArr = {
    currQuestionIndex: 0,
    questions:[],
    // Durstenfeld shuffle
    shuffleQuestions: function() {
        for (var i = this.questions.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.questions[i];
            this.questions[i] = this.questions[j]
            this.questions[j] = temp;
        }
        this.currQuestionIndex = 0;
    },
    getNextQuestion: function() {
        if (this.currQuestionIndex >= this.questions.length) {
            console.log('All questions asked - return null');
            return null;
        } else {
            this.currQuestionIndex++;
            return this.questions[this.currQuestionIndex - 1];
        }
    }
};

var init = function() {
    questionArr.questions.push(one);
    questionArr.questions.push(two);
    questionArr.questions.push(three);
    questionArr.questions.push(four);
    questionArr.shuffleQuestions();

    sectionQuestionsEl.style.display = 'none';
    sectionResultEl.style.display = 'none';
    sectionHighScoresEl.style.display = 'none';
    ansEl.style.display = 'none';
} 

var questionTitleEl = document.getElementById('question');
var btnQ1El = document.getElementById('btn-q1');
var btnQ2El = document.getElementById('btn-q2');
var btnQ3El = document.getElementById('btn-q3');
var btnQ4El = document.getElementById('btn-q4');
var timerEl = document.getElementById('timer');
var ansEl = document.getElementById('answer');
var sectionIntroEl = document.getElementById('intro');
var sectionQuestionsEl = document.getElementById('questions');
var sectionResultEl = document.getElementById('result');
var sectionHighScoresEl = document.getElementById('high-scores');
var btnStartQuiz = document.getElementById('start-quiz');

const handleQuestionButtonClick = (event) => {
    if (event.target.getAttribute('id').endsWith(currQuestion.correct)) {
        console.log('correct');
        ansEl.textContent = "Correct!";
        ansEl.style.display = 'inline';
    } else {
        console.log('wrong');
        ansEl.textContent = "Wrong!";
        ansEl.style.display = 'inline';
        currTime -= 10;
    }
    setTimeout(function() {
        displayCurrentQuestion();
    }, 1000);
}

btnQ1El.addEventListener('click', handleQuestionButtonClick);
btnQ2El.addEventListener('click', handleQuestionButtonClick);
btnQ3El.addEventListener('click', handleQuestionButtonClick);
btnQ4El.addEventListener('click', handleQuestionButtonClick);

var displayCurrentQuestion = function() {
    currQuestion = questionArr.getNextQuestion();
    if (currQuestion != null) {
        ansEl.style.display = 'none';
        sectionQuestionsEl.style.display = 'flex';
        questionTitleEl.textContent = currQuestion.title;
        btnQ1El.textContent = currQuestion.answers[0];
        btnQ2El.textContent = currQuestion.answers[1];
        btnQ3El.textContent = currQuestion.answers[2];
        btnQ4El.textContent = currQuestion.answers[3];
    } else {
        console.log('All questions completed');
        stopTimer();
    }
}

var resetTimer = function() {
    timerEl.style.display = 'inline';
    currTime = 75;
}
var timerInterval;
var startTimer = function() {
    timerInterval = setInterval(function() {
        console.log('timer update ' + currTime);
        timerEl.textContent = currTime;
        currTime--;
        if (currTime === 0) {
            stopTimer();
        }
    }, 1000);
}
var stopTimer = function() {
    console.log('Stopped timer');
    clearInterval(timerInterval);
}

btnStartQuiz.addEventListener('click', function() {
    sectionIntroEl.style.display = 'none';
    resetTimer();
    startTimer();
    displayCurrentQuestion();
});

init();
