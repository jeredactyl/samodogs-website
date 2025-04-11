// quiz.js

const quizData = [
  {
    q: "What is the recommended leash length on trails?",
    a: ["3 feet", "6 feet", "12 feet"],
    correct: "6 feet",
    img: "images/leash-length.png",
  },
  {
    q: "Why is it important to keep your dog on a leash while hiking?",
    a: [
      "To protect your dog, other hikers, and local wildlife",
      "To let your dog roam freely",
      "Because dogs naturally ignore trail rules",
    ],
    correct: "To protect your dog, other hikers, and local wildlife",
    img: "images/why-leash.png",
  },
  {
    q: "What is one direct consequence of dogs being off-leash on trails?",
    a: ["Improved ecosystem", "Wildlife stress", "Enhanced biodiversity"],
    correct: "Wildlife stress",
    img: "images/wildlife-stress.png",
  },
  {
    q: "What is the best option to carry for proper disposal of your dog's waste on trails?",
    a: ["Biodegradable waste bags", "Regular plastic bags", "Paper towels"],
    correct: "Biodegradable waste bags",
    img: "images/dog-waste.png",
  },
  {
    q: "Following responsible dog hiking practices can help preserve natural habitats. What is one environmental benefit?",
    a: [
      "Increased wildlife diversity",
      "Higher noise levels",
      "More crowded trails",
    ],
    correct: "Increased wildlife diversity",
    img: "images/habitat-benefit.png",
  },
  {
    q: "Before heading out on a hike with your dog, what is an important detail to verify?",
    a: [
      "The pet policies of the park",
      "That your dog enjoys hiking",
      "The weather conditions",
    ],
    correct: "The pet policies of the park",
    img: "images/pet-policy.png",
  },
  {
    q: "What is one direct risk of allowing dogs to chase wildlife?",
    a: [
      "They help wildlife exercise",
      "They can injure or cause stress to wildlife",
      "They cause no harm",
    ],
    correct: "They can injure or cause stress to wildlife",
    img: "images/chasing-wildlife.png",
  },
  {
    q: "What is one indirect effect of disturbed wildlife behavior due to off-leash dogs?",
    a: [
      "Reduced stress levels",
      "Extra energy expenditure by wildlife",
      "Improved habitat quality",
    ],
    correct: "Extra energy expenditure by wildlife",
    img: "images/indirect-stress.png",
  },
  {
    q: "Which factor contributes to water pollution on trails?",
    a: ["Dog waste", "Excess sunlight", "Bird chirps"],
    correct: "Dog waste",
    img: "images/pollution.png",
  },
  {
    q: "What is one key reason to follow trail regulations regarding dogs?",
    a: [
      "To ensure safety and preserve natural habitats",
      "To annoy fellow hikers",
      "To make the trail crowded",
    ],
    correct: "To ensure safety and preserve natural habitats",
    img: "images/follow-rules.png",
  },
  {
    q: "What is one risk for dogs when they venture off-trail?",
    a: [
      "Encountering rattlesnakes",
      "Finding extra water sources",
      "Meeting too many wild animals",
    ],
    correct: "Encountering rattlesnakes",
    img: "images/rattlesnake.png",
  },
];

let currentQuestion = 0;
let score = 0;

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const quizSection = document.getElementById("quiz-section");
const quiz = document.getElementById("quiz");
const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const result = document.getElementById("quiz-result");

function showQuestion(index) {
  const data = quizData[index];
  questionContainer.innerHTML = `
      <fieldset class="active" role="radiogroup" aria-labelledby="q${index}">
        ${
          data.img
            ? `<img src="${data.img}" alt="Illustration for the question" style="max-width: 100%; border-radius: 0.5rem; margin-bottom: 1rem;">`
            : ""
        }
        <legend class="question" id="q${index}">${index + 1}. ${data.q}</legend>
        ${data.a
          .map(
            (choice, i) => `
          <div>
            <input type="radio" id="q${index}-a${i}" name="question" value="${choice}" />
            <label for="q${index}-a${i}">${choice}</label>
          </div>
        `
          )
          .join("")}
      </fieldset>
    `;
  progress.textContent = `Question ${index + 1} of ${quizData.length}`;
  progressBar.style.width = `${((index + 1) / quizData.length) * 100}%`;
  nextButton.textContent = index === quizData.length - 1 ? "Submit" : "Next";
}

startButton.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizSection.style.display = "block";
  showQuestion(currentQuestion);
});

nextButton.addEventListener("click", () => {
  const selected = document.querySelector("input[name='question']:checked");
  if (!selected) {
    alert("Please select an answer.");
    return;
  }
  if (selected.value === quizData[currentQuestion].correct) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion(currentQuestion);
  } else {
    questionContainer.innerHTML = "";
    nextButton.style.display = "none";
    progress.style.display = "none";
    progressBar.style.display = "none";
    restartButton.style.display = "block";

    const pct = (score / quizData.length) * 100;
    let message = "";
    if (pct === 100) message = "Perfect! You're a dog trail pro! 🐶🏞️";
    else if (pct >= 80) message = "Great job! You really know your stuff. 🐾";
    else if (pct >= 50)
      message = "Nice effort. A little more trail time and you'll be a pro!";
    else
      message = "Looks like it's time for some trail etiquette training! 🐕📚";

    result.innerHTML = `<strong>You scored ${score} out of ${quizData.length}</strong><br>${message}`;
  }
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  nextButton.style.display = "block";
  progress.style.display = "block";
  progressBar.style.display = "block";
  progressBar.style.width = "0%";
  result.textContent = "";
  restartButton.style.display = "none";
  showQuestion(currentQuestion);
});
