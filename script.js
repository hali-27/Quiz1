const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  
  {
    question: "Where is The Blue Mosque located?",
    answers: [
      { text: "Saudi Arabia", correct: false},
      { text: "Santorini", correct: false},
      { text: "Turkey", correct: true},
        { text: "Dubai", correct: false},
    ],
},

{
    question: "Which statement is true about Mount. Fuji?",
    answers: [
        {text: "It is an active volcano", correct: true},
        {text: "You can see it every day of the year", correct: false},
        {text: "It is 1000meters tall", correct: false},
        {text: "It is located in China", correct: false},
    ],
},

{
    question: "What is the brightest city on Earth when viewed from outer space?",
    answers: [
      {text: "Tokyo", correct: false},
      {text: "Las Vegas", correct: true},
        {text: "New York", correct: false},
        {text: "Moscow", correct: false},
    ],
},

{
    question: "The Monster Building in Hong Kong is home to around how many people?",
    answers: [
      {text: "1,000", correct: false},
      {text: "30,000", correct: false},
      {text: "5,000", correct: false},
      {text: "10,000", correct: true},
    ],
},

{
    question: "Where is the world's second-largest coral reef?",
    answers: [
        {text: "Mexico", correct: true},
        {text: "Australia", correct: false},
        {text: "Bahamas", correct: false},
        {text: "Dubai", correct: false},
    ],
},

{
    question: "Where was Tutankhamun's mummy found?",
    answers: [
      {text: "Enlgand", correct: false},
      {text: "USA", correct: false},
      {text: "Eygypt", correct: true},
        {text: "Brazil", correct: false},
    ],
},
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
