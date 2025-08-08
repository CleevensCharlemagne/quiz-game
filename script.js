// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


// event listenners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){

    // Reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent  = score

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()

}

function showQuestion(){
    // reset vars
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1

    questionText.textContent = currentQuestion.question

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100

    progressBar.style.width = progressPercent + "%"

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        // A dataset is a propoerty of the button that allows you to store custom data
        button.dataset.correct = answer.correct;;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);

    })}

    function selectAnswer (event){
        // Optimization check
        if (answersDisabled) return

        answersDisabled = true;

        const selectedButton = event.target;
        const isCorrect = selectedButton.dataset.correct === "true";

        if (isCorrect){
            selectedButton.classList.add("correct")
            score++;
            scoreSpan.textContent = score;
        } else {
            selectedButton.classList.add("incorrect")
        }
        
        setTimeout(() => {
            currentQuestionIndex++;

            if(currentQuestionIndex < quizQuestions.length){
                showQuestion()
            } else {
                showResults()
            }
        }, 1000);
    }

function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    if (score < 5){
        resultMessage.textContent = "Good effort! Keep learning!";
    } else {
        resultMessage.textContent = "Good Job!!!";
    }
}

function restartQuiz(){
    finalScoreSpan.textContent = 0;
    resultScreen.classList.remove("active");
    startQuiz()
}


