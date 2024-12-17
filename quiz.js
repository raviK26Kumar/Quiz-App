const question = [
    {
        question: "Who is the Prime minister of India?",
        answers: [
            {text: "Mahatma Gandhi", correct: false},
            {text: "Rahul Gandhi", correct: false},
            {text: "Ravi kumar", correct: false},
            {text: "Narendra Modi", correct: true},
        ]
    },
    {
        question: "Who is Father of the Nation?",
        answers: [
            {text: "Mahatma Gandhi", correct: true},
            {text: "Ravi kumar", correct: false},
            {text: "Narendra Modi", correct: false},
            {text: "Rahul Gandhi", correct: false},
        ]
    },
    {
        question: "A biggest animal on the earth?",
        answers: [
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
            {text: "Human", correct: false},
            {text: "Blue whale", correct: true},
        ]
    },
    {
        question: "What can easily make Yuvi smile?",
        answers: [
            {text: "Food", correct: false},
            {text: "Music", correct: false},
            {text: "Bubu", correct: true},
            {text: "Travelling", correct: false},
        ]
    } 
];
const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score =  0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
    
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    } else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === 'true' ){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block';
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener('click', ()=> {
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();