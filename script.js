document.addEventListener('DOMContentLoaded', () => {
  const questions = {
      subject: document.getElementById('q1-subject'),
      difficulty: document.getElementById('q2-difficulty'),
      preference: document.getElementById('q3-preference'),
      time: document.getElementById('q4-time'),
      learner: document.getElementById('q5-learner')
  };

  const resultContainer = document.getElementById('result-container');
  const resultText = document.getElementById('result-text');
  const restartButton = document.getElementById('restart-button');

  const userChoices = {};
  let currentQuestionKey = 'subject'; // Start with the first question

  function showQuestion(questionKey) {
      // Hide all questions
      Object.values(questions).forEach(q => q.classList.remove('active'));
      resultContainer.style.display = 'none';

      // Show current question
      if (questions[questionKey]) {
          questions[questionKey].classList.add('active');
          currentQuestionKey = questionKey;
      }
  }

  function showResult(method) {
      Object.values(questions).forEach(q => q.classList.remove('active'));
      resultText.textContent = method;
      resultContainer.style.display = 'block';
  }

  function handleChoice(event) {
      if (event.target.tagName === 'BUTTON' && event.target.dataset.question) {
          const question = event.target.dataset.question;
          const value = event.target.dataset.value;

          // Visual feedback: briefly highlight clicked button
          event.target.classList.add('clicked');
          setTimeout(() => event.target.classList.remove('clicked'), 200);


          userChoices[question] = value;
          decideNextStep();
      }
  }

  function decideNextStep() {
      const { subject, difficulty, preference, time, learner } = userChoices;

      if (subject === "theoretical") {
          showResult("Teach each other");
      } else if (subject === "analytical") {
          if (!difficulty) {
              showQuestion('difficulty');
          } else if (difficulty === "easy") {
              showResult("Read and summarize");
          } else if (difficulty === "hard") {
              if (!preference) {
                  showQuestion('preference');
              } else if (preference === "group") {
                  showResult("Teach each other");
              } else if (preference === "solo") {
                  if (!time) {
                      showQuestion('time');
                  } else if (time === "yes") { // "yes" means > 2 hours
                      showResult("Practice Quiz");
                  } else { // "no" means <= 2 hours
                      if (!learner) {
                          showQuestion('learner');
                      } else if (learner === "yes") { // is_visual_learner == TRUE
                          showResult("Use mind mapping");
                      } else { // is_visual_learner == FALSE
                          showResult("Review Notes");
                      }
                  }
              }
          }
      }
  }

  // Add event listeners to all question containers using event delegation
  Object.values(questions).forEach(container => {
      container.addEventListener('click', handleChoice);
  });

  restartButton.addEventListener('click', () => {
      // Clear choices
      for (let key in userChoices) {
          delete userChoices[key];
      }
      // Reset to the first question
      showQuestion('subject');
  });

  // Initialize: Show the first question
  showQuestion('subject');
});

// Add a subtle class for clicked state if not covered by :active
// This is optional if :active CSS is sufficient for you
const style = document.createElement('style');
style.innerHTML = `
button.clicked {
  background-color: #004085 !important; /* Darker shade for feedback */
  transform: scale(0.98);
}
`;
document.head.appendChild(style);
