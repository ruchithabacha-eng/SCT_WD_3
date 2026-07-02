const questions = [
    {
        type: "single",
        question: "1. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks Text Mark Language",
            "Hyper Transfer Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        type: "multiple",
        question: "2. Which of these are programming languages?",
        options: ["Java", "Python", "HTML", "JavaScript"],
        answer: ["Java", "Python", "JavaScript"]
    },
    {
        type: "fill",
        question: "3. Fill in the blank: CSS stands for ______ Style Sheets.",
        answer: "Cascading"
    },
    {
        type: "truefalse",
        question: "4. JavaScript is used to make web pages interactive.",
        options: ["True", "False"],
        answer: "True"
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const question = document.getElementById("question");
const options = document.getElementById("options");
const fillAnswer = document.getElementById("fill-answer");

document.getElementById("start-btn").addEventListener("click", () => {
    startScreen.classList.add("hide");
    quizScreen.classList.remove("hide");
    showQuestion();
});

function showQuestion() {

    const q = questions[currentQuestion];

    question.innerText = q.question;
    options.innerHTML = "";
    fillAnswer.classList.add("hide");
    fillAnswer.value = "";

    if (q.type == "single" || q.type == "truefalse") {

        q.options.forEach(option => {

            options.innerHTML += `
            <label class="option">
                <input type="radio" name="answer" value="${option}">
                ${option}
            </label>
            `;

        });

    }

    else if (q.type == "multiple") {

        q.options.forEach(option => {

            options.innerHTML += `
            <label class="option">
                <input type="checkbox" value="${option}">
                ${option}
            </label>
            `;

        });

    }

    else if (q.type == "fill") {

        fillAnswer.classList.remove("hide");

    }

}

document.getElementById("next-btn").addEventListener("click", () => {

    saveAnswer();

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});

function saveAnswer() {

    const q = questions[currentQuestion];

    let answer = "";

    if (q.type == "single" || q.type == "truefalse") {

        const selected = document.querySelector('input[name="answer"]:checked');

        answer = selected ? selected.value : "No Answer";

        if (answer == q.answer)
            score++;

    }

    else if (q.type == "multiple") {

        const checked = document.querySelectorAll('input[type="checkbox"]:checked');

        answer = [];

        checked.forEach(item => {
            answer.push(item.value);
        });

        if (
            answer.length == q.answer.length &&
            answer.every(value => q.answer.includes(value))
        ) {
            score++;
        }

    }

    else if (q.type == "fill") {

        answer = fillAnswer.value.trim();

        if (answer.toLowerCase() == q.answer.toLowerCase())
            score++;

    }

    userAnswers.push(answer);

}

function showResult() {

    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    document.getElementById("score").innerHTML =
        `Your Score: ${score} / ${questions.length}`;

    // Hide the review section
    document.getElementById("review").style.display = "none";

};

