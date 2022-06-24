import styles from './style.module.css'

export default function Spinner({ spin = true }) {
  return <div className={`${styles.spinner} ${spin ? styles.spin : styles.stop}`}> </div>
}
