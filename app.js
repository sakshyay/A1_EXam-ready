// The questions live in one list so you can easily add, remove, or edit them.
// Every question has a skill and a practice tip used on the results screen.
const questions = [
  { skill: "Vocabulary", context: "Choose the word that completes the sentence.", prompt: "Ich habe heute großen ___. Ich möchte etwas essen.", options: ["Durst", "Hunger", "Schlaf", "Urlaub"], answer: 1, topic: "Everyday words: practise the difference between Hunger (hungry) and Durst (thirsty)." },
  { skill: "Grammar", context: "Choose the correct article.", prompt: "___ Tisch ist neu.", options: ["Der", "Die", "Das", "Ein"], answer: 0, topic: "Noun articles: review the article that belongs with common nouns, such as der Tisch." },
  { skill: "Reading", context: "Read the note, then answer the question.", passage: "Hallo Mia, der Deutschkurs beginnt heute nicht um 9 Uhr, sondern um 10 Uhr. Wir treffen uns im Raum 4. Bis später! — Lena", prompt: "Wann beginnt der Deutschkurs heute?", options: ["Um 9 Uhr", "Um 10 Uhr", "Um 4 Uhr", "Morgen"], answer: 1, topic: "Reading for details: look for time changes and key information in short messages." },
  { skill: "Vocabulary", context: "Choose the best German word.", prompt: "You want to say “the train station”. Which word do you need?", options: ["Der Bahnhof", "Die Bäckerei", "Das Krankenhaus", "Der Flughafen"], answer: 0, topic: "Places in town: revise useful places such as Bahnhof, Bäckerei and Krankenhaus." },
  { skill: "Grammar", context: "Choose the correct verb form.", prompt: "Wir ___ in Berlin.", options: ["wohne", "wohnst", "wohnt", "wohnen"], answer: 3, topic: "Present-tense verbs: practise verb endings with ich, du, er/sie, and wir." },
  { skill: "Reading", context: "Read the notice, then answer the question.", passage: "Café Sonnenschein · Montag bis Freitag: 8–18 Uhr · Samstag: 9–14 Uhr · Sonntag: geschlossen", prompt: "Wann ist das Café am Samstag geöffnet?", options: ["Von 8 bis 18 Uhr", "Von 9 bis 14 Uhr", "Nur am Abend", "Es ist geschlossen"], answer: 1, topic: "Reading notices: practise finding opening days and times in short signs." },
  { skill: "Vocabulary", context: "Choose the best word for the situation.", prompt: "Es regnet. Was brauchst du draußen?", options: ["Einen Regenschirm", "Eine Sonnenbrille", "Ein Fahrrad", "Einen Teller"], answer: 0, topic: "Everyday objects and weather: connect common situations with the words you need." },
  { skill: "Grammar", context: "Choose the correct word order.", prompt: "Which sentence is correct?", options: ["Morgen ich fahre nach Hause.", "Morgen fahre ich nach Hause.", "Ich morgen nach Hause fahre.", "Fahre morgen ich nach Hause."], answer: 1, topic: "Sentence word order: in a statement, the conjugated verb usually comes second." },
  { skill: "Reading", context: "Read the message, then answer the question.", passage: "Hallo Tom, ich kann heute leider nicht ins Kino kommen. Meine Schwester ist krank. Können wir am Freitag gehen? Viele Grüße, Anna", prompt: "Warum kann Anna heute nicht ins Kino gehen?", options: ["Sie arbeitet lange.", "Sie ist krank.", "Ihre Schwester ist krank.", "Das Kino ist geschlossen."], answer: 2, topic: "Reading for reasons: look for words that explain why someone can or cannot do something." },
  { skill: "Vocabulary", context: "Choose the word that completes the sentence.", prompt: "Am Morgen esse ich Brot und trinke ___ .", options: ["Kaffee", "Milchstraße", "Wasserfall", "Bahnhof"], answer: 0, topic: "Food and drink: build your everyday vocabulary for meals and ordering." },
  { skill: "Grammar", context: "Choose the correct question word.", prompt: "___ kostet ein Kaffee? — 3 Euro.", options: ["Wer", "Wo", "Wie viel", "Wann"], answer: 2, topic: "Question words: practise choosing wie viel for prices, wo for places, and wann for time." },
  { skill: "Reading", context: "Read the email, then answer the question.", passage: "Liebe Sara, ich bin um 16 Uhr am Bahnhof. Mein Zug kommt auf Gleis 2 an. Danach nehmen wir den Bus zum Hotel. Bis bald! — Nina", prompt: "Wo wartet Nina um 16 Uhr?", options: ["Am Hotel", "An der Bushaltestelle", "Am Bahnhof", "Auf Gleis 2 im Zug"], answer: 2, topic: "Reading messages: practise separating the meeting place from the later destination." },
];

const skillNames = ["Vocabulary", "Grammar", "Reading"];
const bookingReadinessThreshold = 50;
const screens = ["welcome-screen", "reflection-screen", "quiz-screen", "results-screen"];
let currentQuestion = 0;
let answers = Array(questions.length).fill(null);
let selfAssessment = { strongest: "", practice: "" };
let reviewMode = false;

const get = (id) => document.getElementById(id);

function showScreen(screenId) {
  screens.forEach((id) => get(id).classList.toggle("hidden", id !== screenId));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startReflection() {
  showScreen("reflection-screen");
}

function startQuiz() {
  selfAssessment = {
    strongest: get("strongest-skill").value,
    practice: get("practice-skill").value,
  };
  currentQuestion = 0;
  answers = Array(questions.length).fill(null);
  reviewMode = false;
  renderQuestion();
  showScreen("quiz-screen");
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion];

  get("question-category").textContent = question.skill.toUpperCase();
  get("question-number").innerHTML = `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} <span>OF ${questions.length}</span>`;
  get("progress-fill").style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  get("question-context").textContent = question.context;
  get("question-text").textContent = question.prompt;
  get("answer-hint").textContent = reviewMode
    ? (selectedAnswer === question.answer ? "That’s right — nice work." : `The answer is ${question.options[question.answer]}. Keep going; every question is a chance to learn.`)
    : "Select one answer to continue.";
  get("back-button").disabled = currentQuestion === 0;
  get("next-button").disabled = !reviewMode && selectedAnswer === null;
  get("next-button").innerHTML = reviewMode
    ? (currentQuestion === questions.length - 1 ? "See my results <span aria-hidden=\"true\">→</span>" : "Next answer <span aria-hidden=\"true\">→</span>")
    : (currentQuestion === questions.length - 1 ? "See my results <span aria-hidden=\"true\">→</span>" : "Continue <span aria-hidden=\"true\">→</span>");

  const list = get("answer-list");
  list.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.setAttribute("aria-pressed", String(index === selectedAnswer));
    if (index === selectedAnswer) button.classList.add("selected");
    if (reviewMode && index === question.answer) button.classList.add("correct-answer");
    if (reviewMode && index === selectedAnswer && selectedAnswer !== question.answer) button.classList.add("wrong-answer");
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span>`;
    button.disabled = reviewMode;
    button.addEventListener("click", () => {
      answers[currentQuestion] = index;
      renderQuestion();
    });
    list.appendChild(button);
  });

  const oldPassage = document.querySelector(".reading-passage");
  if (oldPassage) oldPassage.remove();
  if (question.passage) {
    const passage = document.createElement("blockquote");
    passage.className = "reading-passage";
    passage.textContent = question.passage;
    document.querySelector(".question-copy").insertBefore(passage, get("question-text"));
  }
}

function getSkillScores() {
  return skillNames.map((skill) => {
    const skillQuestions = questions.map((question, index) => ({ question, index })).filter((item) => item.question.skill === skill);
    const correct = skillQuestions.filter(({ question, index }) => answers[index] === question.answer).length;
    return { skill, correct, total: skillQuestions.length, percent: Math.round((correct / skillQuestions.length) * 100) };
  });
}

function resultLabel(percent) {
  if (percent >= 75) return "Looking strong";
  if (percent >= 50) return "Building confidence";
  return "Practise this next";
}

function renderResults() {
  const scores = getSkillScores();
  const totalCorrect = scores.reduce((sum, score) => sum + score.correct, 0);
  const overallPercent = Math.round((totalCorrect / questions.length) * 100);
  get("overall-percent").textContent = `${overallPercent}%`;
  get("results-kicker").textContent = overallPercent >= 75 ? "A STRONG SNAPSHOT" : overallPercent >= 50 ? "A GOOD START" : "A PLACE TO GROW";
  get("results-subtitle").textContent = overallPercent >= 75
    ? "You handled many of these A1 questions well. Keep building on that momentum."
    : "Every missed question gives you a useful clue about what to practise next.";

  const recommendation = get("booking-recommendation");
  const readyToConsiderBooking = overallPercent >= bookingReadinessThreshold;
  recommendation.classList.toggle("needs-practice", !readyToConsiderBooking);
  get("recommendation-title").textContent = readyToConsiderBooking
    ? "You could move ahead with booking your exam."
    : "Consider practising a little more before booking.";
  get("recommendation-detail").textContent = readyToConsiderBooking
    ? `You reached our ${bookingReadinessThreshold}% guide on this short check. Before committing to the exam fee or travel, consider asking a teacher to review your speaking and writing too.`
    : `You scored below our ${bookingReadinessThreshold}% guide. This is a suggestion, not a verdict: practise the areas below, then retake the check or ask a teacher to review your readiness before paying the exam fee or arranging travel.`;

  get("skill-results").innerHTML = scores.map(({ skill, correct, total, percent }) => `
    <article class="skill-card">
      <div class="skill-card-head"><span>${skill}</span><strong>${correct}/${total}</strong></div>
      <span class="skill-status">${resultLabel(percent)}</span>
      <div class="mini-track"><div class="mini-fill" style="width:${percent}%"></div></div>
    </article>`).join("");

  const reflection = get("reflection-result");
  if (selfAssessment.strongest && selfAssessment.practice) {
    const strongestScore = scores.find((score) => score.skill === selfAssessment.strongest);
    const practiceScore = scores.find((score) => score.skill === selfAssessment.practice);
    const strongestMessage = strongestScore.correct >= 3 ? "Your check supports that confidence." : `Your check suggests ${strongestScore.skill.toLowerCase()} could use a little more practice.`;
    const practiceMessage = practiceScore.correct <= 2 ? "That matches what you expected — start there." : `You did better here than you expected — give yourself credit.`;
    reflection.innerHTML = `<b>Your confidence check-in:</b> You felt strongest in ${strongestScore.skill.toLowerCase()} and wanted to practise ${practiceScore.skill.toLowerCase()}. ${strongestMessage} ${practiceMessage}`;
    reflection.classList.remove("hidden");
  } else {
    reflection.classList.add("hidden");
  }

  const missed = questions
    .map((question, index) => ({ question, index }))
    .filter(({ question, index }) => answers[index] !== question.answer)
    .sort((a, b) => scores.findIndex((score) => score.skill === a.question.skill) - scores.findIndex((score) => score.skill === b.question.skill));
  const recommendations = [];
  for (const score of [...scores].sort((a, b) => a.percent - b.percent)) {
    const topic = missed.find(({ question }) => question.skill === score.skill);
    if (topic) recommendations.push({ skill: score.skill, tip: topic.question.topic });
    if (recommendations.length === 3) break;
  }
  if (recommendations.length < 2) {
    for (const score of scores) {
      if (!recommendations.some((item) => item.skill === score.skill)) {
        recommendations.push({ skill: score.skill, tip: `Keep your ${score.skill.toLowerCase()} fresh with a few short A1 practice questions.` });
      }
      if (recommendations.length === 3) break;
    }
  }
  get("practice-list").innerHTML = recommendations.map((item, index) => `
    <article class="practice-item"><span>0${index + 1} / ${item.skill.toUpperCase()}</span><p>${item.tip}</p></article>`).join("");
}

function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else if (reviewMode) {
    renderResults();
    showScreen("results-screen");
  } else {
    renderResults();
    showScreen("results-screen");
  }
}

get("begin-button").addEventListener("click", startReflection);
get("skip-reflection").addEventListener("click", () => {
  get("strongest-skill").value = "";
  get("practice-skill").value = "";
  startQuiz();
});
get("start-quiz-button").addEventListener("click", () => {
  const strongest = get("strongest-skill").value;
  const practice = get("practice-skill").value;
  if (!strongest || !practice || strongest === practice) {
    get("reflection-hint").textContent = strongest === practice && strongest
      ? "Choose two different areas so you can compare your confidence."
      : "Choose one area that feels strongest and one you’d like to practise.";
    get("reflection-hint").classList.add("field-error");
    return;
  }
  get("reflection-hint").classList.remove("field-error");
  startQuiz();
});
get("back-button").addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion -= 1;
    renderQuestion();
  }
});
get("next-button").addEventListener("click", nextQuestion);
get("retry-button").addEventListener("click", () => {
  currentQuestion = 0;
  answers = Array(questions.length).fill(null);
  reviewMode = false;
  showScreen("welcome-screen");
});
get("review-button").addEventListener("click", () => {
  reviewMode = true;
  currentQuestion = 0;
  renderQuestion();
  showScreen("quiz-screen");
});
