const triviaQuestions = [
    // Math Questions
    {
      question: "What is 3 multiplied by 4?",
      options: ["8", "12", "10", "7"],
      answer: "12"
    },
    {
      question: "What is the square root of 81?",
      options: ["9", "6", "7", "8"],
      answer: "9"
    },
    {
      question: "What is 25 divided by 5?",
      options: ["2", "4", "5", "6"],
      answer: "5"
    },
    // Science Questions
    {
      question: "What is the largest planet in our solar system?",
      options: ["Jupiter", "Mars", "Saturn", "Venus"],
      answer: "Jupiter"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Ag", "Au", "Cu", "Fe"],
      answer: "Au"
    },
    {
      question: "What is the primary gas that makes up Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
      answer: "Nitrogen"
    },
    // History Questions
    {
      question: "In which year did the French Revolution begin?",
      options: ["1789", "1804", "1832", "1765"],
      answer: "1789"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
      answer: "Leonardo da Vinci"
    },
    {
      question: "Who invented the telephone?",
      options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Albert Einstein"],
      answer: "Alexander Graham Bell"
    },
    // English Questions
    {
      question: "What is the plural of 'child'?",
      options: ["Childs", "Children", "Childen", "Childies"],
      answer: "Children"
    },
    {
      question: "What is the synonym of 'happy'?",
      options: ["Sad", "Joyful", "Angry", "Bored"],
      answer: "Joyful"
    },
    {
      question: "What is the opposite of 'hot'?",
      options: ["Cold", "Warm", "Burning", "Cool"],
      answer: "Cold"
    },
    // Add more trivia questions here...
  ];
  
  // Generate a new set of questions for each quiz
  function generateTriviaQuestions() {
    const newQuestions = [
      // Math Questions
      {
        question: "What is 6 multiplied by 7?",
        options: ["42", "36", "48", "54"],
        answer: "42"
      },
      {
        question: "What is the square root of 144?",
        options: ["10", "12", "14", "16"],
        answer: "12"
      },
      {
        question: "What is 100 divided by 10?",
        options: ["10", "20", "30", "40"],
        answer: "10"
      },
      // Science Questions
      {
        question: "What is the smallest unit of matter?",
        options: ["Atom", "Molecule", "Cell", "Proton"],
        answer: "Atom"
      },
      {
        question: "What is the chemical symbol for silver?",
        options: ["Ag", "Au", "Cu", "Fe"],
        answer: "Ag"
      },
      {
        question: "What is the process of plants converting sunlight into energy called?",
        options: ["Photosynthesis", "Respiration", "Transpiration", "Fertilization"],
        answer: "Photosynthesis"
      },
      // History Questions
      {
        question: "In which year did the American Revolutionary War end?",
        options: ["1776", "1781", "1783", "1800"],
        answer: "1783"
      },
      {
        question: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Rosalind Franklin", "Jane Goodall", "Ada Lovelace"],
        answer: "Marie Curie"
      },
      {
        question: "Who was the first person to step on the moon?",
        options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
        answer: "Neil Armstrong"
      },
      // English Questions
      {
        question: "What is the plural of 'goose'?",
        options: ["Goose", "Gooses", "Geese", "Geece"],
        answer: "Geese"
      },
      {
        question: "What is the synonym of 'brave'?",
        options: ["Fearless", "Timid", "Cowardly", "Anxious"],
        answer: "Fearless"
      },
      {
        question: "What is the opposite of 'fast'?",
        options: ["Slow", "Quick", "Rapid", "Swift"],
        answer: "Slow"
      },
      // Add more trivia questions here...
    ];
  
    return shuffleArray(newQuestions);
  }
  
  // Shuffle an array in place using the Fisher-Yates algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  let currentQuestionIndex = 0;
  let answeredQuestions = [];
  let countDown;
  let timeSecond;
  let score = 0;
  let shuffledQuestions;
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");
  const leaderboardElement = document.getElementById("leaderboard");
  
  // Function to save high scores to localStorage
  function saveHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
  
  // Function to display high scores from localStorage
  function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
    leaderboardElement.innerHTML = "";
  
    if (highScores.length > 0) {
      const sortedScores = highScores.sort((a, b) => b - a);
      for (let i = 0; i < sortedScores.length; i++) {
        const scoreItem = document.createElement("li");
        scoreItem.innerText = `Score: ${sortedScores[i]}`;
        leaderboardElement.appendChild(scoreItem);
      }
    } else {
      const noScoresMessage = document.createElement("li");
      noScoresMessage.innerText = "No high scores to display.";
      leaderboardElement.appendChild(noScoresMessage);
    }
  }
  
  // Function to start the game
  function startGame() {
    currentQuestionIndex = 0;
    answeredQuestions = [];
    score = 0;
    shuffledQuestions = generateTriviaQuestions().slice(0, 10); // Generate new questions and select 10 for the quiz
    startButton.style.display = "none";
    setupGame();
    showQuestion();
    showHighScores();
  }
  
  // Function to set up the game UI
  function setupGame() {
    feedbackElement.textContent = "";
    leaderboardElement.innerHTML = "";
    timeSecond = 20;
    countDown = setInterval(countDownTimer, 1000);
  }
  
  // Function to display the current question
  function showQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    optionsElement.innerHTML = "";
  
    for (let i = 0; i < currentQuestion.options.length; i++) {
      const option = document.createElement("button");
      option.textContent = currentQuestion.options[i];
      option.classList.add("option");
      option.addEventListener("click", handleAnswer);
      optionsElement.appendChild(option);
    }
  }
  
  // Function to handle the user's answer
  function handleAnswer(event) {
    clearInterval(countDown);
    const selectedOption = event.target;
    const selectedAnswer = selectedOption.textContent;
  
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;
  
    if (selectedAnswer === correctAnswer) {
      feedbackElement.textContent = "Correct!";
      score += 10;
    } else {
      feedbackElement.textContent = "Wrong!";
    }
  
    answeredQuestions.push(currentQuestion);
    currentQuestionIndex++;
  
    if (currentQuestionIndex === shuffledQuestions.length) {
      endGame();
    } else {
      setTimeout(showQuestion, 1000);
    }
  }
  
  // Function to end the game and display the final score
  function endGame() {
    questionElement.textContent = "";
    optionsElement.innerHTML = "";
    feedbackElement.textContent = `Game Over! Your score is ${score}`;
    saveHighScore(score);
    startButton.style.display = "inline-block";
  }
  
  // Function for the countdown timer
  function countDownTimer() {
    if (timeSecond === 0) {
      clearInterval(countDown);
      handleAnswer({ target: { textContent: "" } });
    } else {
      timeSecond--;
    }
  }
  
  // Call startGame function when the start button is clicked
  const startButton = document.getElementById("start-game");
  startButton.addEventListener("click", startGame);
  
  // Call showHighScores function after setting up the game and showing the question
  startButton.addEventListener("click", showHighScores);
  