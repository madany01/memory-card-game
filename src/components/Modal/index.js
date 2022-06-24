import styles from './style.module.css'

export default function Modal({ children, onOverlayClick }) {
  return (
    <div className={styles.modal} {...(onOverlayClick && { onClick: onOverlayClick })}>
      {/*  eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */}
      <div onClick={e => e.stopPropagation()} className={styles.modalContent}>
        {children}
      </div>
    </div>
  )
}
