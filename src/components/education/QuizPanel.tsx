import { QUIZ_QUESTIONS } from '../../content/quiz'
import { useEducationStore } from '../../store/educationStore'
import { useUiStore } from '../../store/uiStore'

export function QuizPanel() {
  const index = useEducationStore((s) => s.quizIndex)
  const score = useEducationStore((s) => s.quizScore)
  const answer = useEducationStore((s) => s.answerQuiz)
  const reset = useEducationStore((s) => s.resetQuiz)
  const close = () => useUiStore.getState().setActivePanel('none')
  const question = QUIZ_QUESTIONS[index]
  const done = index >= QUIZ_QUESTIONS.length

  return (
    <aside className="side-panel" aria-label="Kısa sınav">
      <header className="panel-head">
        <h2>Kısa sınav</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label="Kapat">
          ×
        </button>
      </header>
      {done || !question ? (
        <div>
          <p>
            Puanın: {score} / {QUIZ_QUESTIONS.length}
          </p>
          <button type="button" className="btn" onClick={reset}>
            Yeniden dene
          </button>
        </div>
      ) : (
        <div>
          <p>{question.prompt}</p>
          <div className="quiz-options">
            {question.options.map((option, optionIndex) => (
              <button key={option} type="button" className="nav-btn" onClick={() => answer(optionIndex === question.correctIndex)}>
                {option}
              </button>
            ))}
          </div>
          <p className="muted">{question.explain}</p>
        </div>
      )}
    </aside>
  )
}
