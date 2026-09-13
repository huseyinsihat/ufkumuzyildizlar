import { QUIZ_QUESTIONS } from '../../content/quiz'
import { L, loc, tx } from '../../i18n/types'
import { useLang, useT } from '../../i18n/useT'
import { useEducationStore } from '../../store/educationStore'
import { useUiStore } from '../../store/uiStore'

const SCORE = L('Puanın: {score} / {total}', 'Your score: {score} / {total}')
const RETRY = L('Yeniden dene', 'Try again')

export function QuizPanel() {
  const t = useT()
  const lang = useLang()
  const index = useEducationStore((s) => s.quizIndex)
  const score = useEducationStore((s) => s.quizScore)
  const answer = useEducationStore((s) => s.answerQuiz)
  const reset = useEducationStore((s) => s.resetQuiz)
  const close = () => useUiStore.getState().setActivePanel('none')
  const question = QUIZ_QUESTIONS[index]
  const done = index >= QUIZ_QUESTIONS.length

  return (
    <aside className="side-panel" aria-label={t('quiz')}>
      <header className="panel-head">
        <h2>{t('quiz')}</h2>
        <button type="button" className="icon-btn" onClick={close} aria-label={t('close')}>
          ×
        </button>
      </header>
      {done || !question ? (
        <div>
          <p>{tx(lang, SCORE).replace('{score}', String(score)).replace('{total}', String(QUIZ_QUESTIONS.length))}</p>
          <button type="button" className="btn" onClick={reset}>
            {tx(lang, RETRY)}
          </button>
        </div>
      ) : (
        <div>
          <p>{loc(lang, question.prompt)}</p>
          <div className="quiz-options">
            {question.options.map((option, optionIndex) => (
              <button key={loc(lang, option)} type="button" className="nav-btn" onClick={() => answer(optionIndex === question.correctIndex)}>
                {loc(lang, option)}
              </button>
            ))}
          </div>
          <p className="muted">{loc(lang, question.explain)}</p>
        </div>
      )}
    </aside>
  )
}
