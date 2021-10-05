var questionArr = {
    title:['Title 1', 'Title 2', 'Title 3', 'Title 4'],
    answers:[['11','12','13','14'], ['21','22','23','24'], ['31','32','33','34'], ['41','42','43','44']],
    correct:[2,4,3,1],
    getRandomQuestion: function() {
        var question = Math.floor(Math.random()*this.title.length);
        return {'title':this.title[question], 
                'q1':this.answers[question][0],
                'q2':this.answers[question][1],
                'q3':this.answers[question][2],
                'q4':this.answers[question][3],
                'correct': this.correct[question]
            }
    }
};

var currQuestion = questionArr.getRandomQuestion();

var questionTitle = document.getElementById('question');
var btnQ1 = document.getElementById('btn-q1');
var btnQ2 = document.getElementById('btn-q2');
var btnQ3 = document.getElementById('btn-q3');
var btnQ4 = document.getElementById('btn-q4');

const handleQuestionButtonClick = (event) => {
    if (event.target.getAttribute('id').endsWith(currQuestion.correct)) {
        console.log('correct');
    } else {
        console.log('wrong');
    }
}

btnQ1.addEventListener('click', handleQuestionButtonClick);
btnQ2.addEventListener('click', handleQuestionButtonClick);
btnQ3.addEventListener('click', handleQuestionButtonClick);
btnQ4.addEventListener('click', handleQuestionButtonClick);

var sectionIntro = document.getElementById('intro');
var sectionQuestions = document.getElementById('questions');
var sectionResult = document.getElementById('result');
var sectionHighScores = document.getElementById('high-scores');

var btnStartQuiz = document.getElementById('start-quiz');

sectionQuestions.style.display = 'none';
sectionResult.style.display = 'none';
sectionHighScores.style.display = 'none';

btnStartQuiz.addEventListener('click', function() {
    sectionIntro.style.display = 'none';
    sectionQuestions.style.display = 'flex';
    currQuestion = questionArr.getRandomQuestion();
    questionTitle.textContent = currQuestion.title;
    btnQ1.textContent = currQuestion.q1;
    btnQ2.textContent = currQuestion.q2;
    btnQ3.textContent = currQuestion.q3;
    btnQ4.textContent = currQuestion.q4;
});

