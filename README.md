# Ready, Set, Deutsch

A responsive A1 German practice diagnostic. Learners can reflect on their confidence, answer 12 questions across vocabulary, grammar and reading, then see scores by skill and suggestions for what to practise.

## Run it

No installation or build step is needed. Open `index.html` in a modern web browser.

## How the check works

- There are four questions in each of the three skills.
- Each correct answer adds one point to its skill score.
- Skill scores are labelled **Looking strong** (3–4 correct), **Building confidence** (2 correct), or **Practise this next** (0–1 correct).
- The provisional rule for suggesting a full mock is at least 10/12 overall and at least 3/4 in every skill.
- Meeting that rule suggests taking a full timed mock exam; it is not a recommendation to book or a prediction of passing.
- The practice suggestions are linked to missed topics. Learners can compare their self-reported confidence with their skill scores.

This short check does not assess listening, writing or speaking. It is not an official Goethe or ÖSD exam and should not be used alone to decide whether to book.

## How we would validate the readiness approach

The cut-off is provisional. Before using it to guide booking decisions, compare results with learners' outcomes on full timed mock exams and, where possible, their later official exam results. Calibrate Goethe and ÖSD separately and check that learners meet the target exam's section or module minimums.

Track two errors:

- **False-ready rate:** among learners routed to a full mock, how many fail that mock or their target exam?
- **False-not-ready rate:** among learners who pass the mock or target exam, how many were routed back to practise?

Set the final threshold to keep false reassurance acceptably low without needlessly delaying learners. Review these rates as more outcome data becomes available.

## Files

- `index.html` contains the screens.
- `styles.css` contains the visual design and mobile layout.
- `app.js` contains the questions, quiz flow, scoring and recommendations.
