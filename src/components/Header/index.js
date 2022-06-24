import formatDuration from '../../formatDuration'
import styles from './style.module.css'

function formatScore(score) {
  return `${score.cnt} in ${formatDuration(score.duration)}`
}

export default function Header({ maxScore, score, onReset, onRestart }) {
  return (
    <header className={styles.header}>
      {onReset && (
        <button className={styles.btn} onClick={onReset}>
          new game
        </button>
      )}

      {onRestart && (
        <button className={styles.btn} onClick={onRestart}>
          again
        </button>
      )}

      <h1 className={styles.brand}>Memory Card</h1>

      <ul className={styles.statusList}>
        <li className={styles.status}>
          <span className={styles.label}>🥇 max score</span>
          <span className={styles.value}>{formatScore(maxScore)}s</span>
        </li>

        <li className={styles.status}>
          <span className={styles.label}>🧮 your score</span>
          <span className={styles.value}>{score.cnt}</span>
        </li>

        <li className={styles.status}>
          <span className={styles.label}>⏰ time</span>
          <span className={styles.value}>{formatDuration(score.duration)}s</span>
        </li>
      </ul>
    </header>
  )
}
