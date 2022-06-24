import styles from './style.module.css'

export default function ProgressBar({ completeRatio }) {
  return (
    <div className={styles.progressBar}>
      <div className={styles.indicator} style={{ width: `${completeRatio * 100}%` }} />
    </div>
  )
}
