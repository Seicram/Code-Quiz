const questions = [
    {
        question: "What is 1 + 1?",
        options: ["2", "200", "2000", "-2"],
        answer: "2"
    },
    {
        question: "What is 2 + 2?",
        options: ["4", "40", "400", "-4"],
        answer: "4"
    },
    {
        question: "What is 4 + 4",
        options: ["8", "80", "800", "-8"],
        answer: "8"
    },
    {
        question: "What is 5 x 5",
        options: ["10", "25", "250", ".10"],
        answer: "25"
    }
];

let currentQuestionIndex = 0;
let answeredQuestions = [];
let countDown;
let timeSecond;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");

function setupGame() {
    const time = document.querySelector('h2');
    timeSecond = 120;
    updateTime();
    time.innerHTML = `Time Remaining:  ${timeSecond}`;

    // Countdown + consistent decrement interval
    countDown = setInterval(() => {
        timeSecond--;
        updateTime();
        time.innerHTML = `Time Remaining:  ${timeSecond}`;
        if (timeSecond <= 0 || timeSecond < 1) {
            endQuiz(timeSecond);
            clearInterval(countDown);
            const start = document.getElementById(`start-game`);
            //causes button to reappear after countdown has concluded
            start.style.display = `block`;
        }
    }, 1000)
}

function showQuestion() {
    updateTime();
    const currentQuestion = questions[currentQuestionIndex];
    if (answeredQuestions.includes(currentQuestionIndex)) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            console.log("time second logged showQuestion", timeSecond)
            endQuiz(timeSecond);
        }
        return;
    }

    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(function (option) {
        console.log("time second logged in options function", timeSecond)
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", function () {

            if (option === currentQuestion.answer) {
                feedbackElement.textContent = "Correct!";
                answeredQuestions.push(currentQuestionIndex);
            } else {
                feedbackElement.textContent = "Wrong!";
                answeredQuestions.push(currentQuestionIndex);
                timeSecond -= 10;
                updateTime();
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                console.log("endQuiz called on CurrentQuestion.options", timeSecond)
                endQuiz(timeSecond);
            }
        });
        optionsElement.appendChild(button);
    });
}


function updateTime() {
    const time = document.querySelector('h2');
    time.innerHTML = `Time Remaining: ${timeSecond}`;
}



function endQuiz(timeSecond) {
    console.log("time second logged final time", timeSecond)
    updateTime();
    score = timeSecond;
    console.log("final score logged", score)
    clearInterval(countDown);
    // check if all questions have been answered

    if (answeredQuestions.length === questions.length) {
        feedbackElement.textContent = `Quiz ended. All questions answered! Your score is ${score}`;
    }
    else {
        feedbackElement.textContent = "";
        optionsElement.innerHTML = "";
        questionElement.textContent = "";
        feedbackElement.textContent = `Quiz Ended. Your score is ${score}`
    }

    // clear the options and question elements
    optionsElement.innerHTML = "";
    questionElement.textContent = "";

    // show the start button again
    const start = document.getElementById("start-game");
    start.style.display = "block";
}

const startButton = document.getElementById("start-game");
startButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    answeredQuestions = [];
    feedbackElement.textContent = "";
    startButton.style.display = "none";
    setupGame();
    showQuestion();




    //Final Score / Highscore element


    const saveButton = document.querySelector("#saveButton");
    saveButton.addEventListener("click", function (event) {
        // event.preventDefault()
        const allScores = JSON.parse(localStorage.getItem("allScores")) || []
        const highScore = {
            initials: document.getElementById("initials").value,
            finalScore: score
        };
        if (initials === "") {
            displayMessage("error", "Initials cannot be blank");
        } else {
            allScores.push(highScore)
            Object.entries(allScores).sort((a,b) =>b[1]-a[1])
            console.log(allScores)
            localStorage.setItem("allScores", JSON.stringify(allScores))
            console.log("Logged in else",allScores)
        }
        return;
    });
});

