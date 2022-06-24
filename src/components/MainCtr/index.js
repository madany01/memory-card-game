import styles from './style.module.css'

export default function MainCtr({ children, backgroundIndicator }) {
  return (
    <div
      className={`${styles.ctr} ${backgroundIndicator ? styles[backgroundIndicator] : ''}`}
    >
      {children}
    </div>
  )
}
