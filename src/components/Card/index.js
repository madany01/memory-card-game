import styles from './style.module.css'

export default function Card({ imgUrl, alt, onClick, borderColor }) {
  return (
    <button
      className={`
      ${styles.card}
      ${borderColor ? styles[`border-${borderColor}`] : ''}
      `}
      disabled={!onClick}
      onClick={onClick || undefined}
    >
      <img src={imgUrl} alt={alt} />
    </button>
  )
}
