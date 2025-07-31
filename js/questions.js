// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA5aaauuUS6bdNNFBFr8681ewtIvkWgRcU",
  authDomain: "ella-2d3df.firebaseapp.com",
  projectId: "ella-2d3df",
  storageBucket: "ella-2d3df.firebasestorage.app",
  messagingSenderId: "391667725375",
  appId: "1:391667725375:web:f73344524a0809e42ef48a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Questions
const questions = [
  {
    question: "Do you love me?",
    answers: ["Yes", "Hmm maybe", "Forever"]
  },
  {
    question: "When did we start dating?",
    answers: ["November 27, 2023", "December 1, 2023", "Valentine's Day"]
  },
  {
    question: "What do you like most about us?",
    answers: ["How we laugh", "How we grow", "How we love"]
  },
  {
    question: "Do you feel safe and loved with me? 💖",
    answers: ["Always", "Mostly", "I’m still figuring it out"]
  },
  {
    question: "What are you most looking forward to? 🔮",
    answers: ["Our next date", "Our first trip", "Spending forever with you"]
  }
];

let currentQuestion = 0;
let selectedAnswers = [];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

function showQuestion() {
  const q = questions[currentQuestion];

  if (!q || !q.answers) {
    console.error("No question or answers found at index", currentQuestion);
    questionEl.textContent = "No question available.";
    return;
  }

  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(answer);
    answersEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
}

function selectAnswer(answer) {
  selectedAnswers[currentQuestion] = answer;

  Array.from(answersEl.children).forEach(btn => btn.classList.remove("selected"));
  const selectedBtn = Array.from(answersEl.children).find(btn => btn.textContent === answer);
  if (selectedBtn) selectedBtn.classList.add("selected");

  nextBtn.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    saveAnswersToFirebase();
  }
}

// ✅ Only ONE definition here
async function saveAnswersToFirebase() {
  try {
    await addDoc(collection(db, "quiz_answers"), {
      answers: selectedAnswers,
      timestamp: serverTimestamp(),
    });

    // ✅ Redirect after saving
    window.location.href = "./main.html";
  } catch (err) {
    console.error("Error saving to Firebase:", err);
    questionEl.textContent = "Oops! Couldn't save your answers.";
  }
}

// Start quiz
showQuestion();
window.nextQuestion = nextQuestion;
