import { useState } from 'react'

import Modal from '../Modal'

import styles from './style.module.css'

export default function GameOpts({
  onCloseClick,
  onCreateClick,
  minCards,
  maxCards,
  initialCards,
}) {
  const [numCards, setNumCards] = useState(initialCards)

  const handleNumCardsChange = e => {
    setNumCards(Number(e.target.value))
  }

  const handleOnCreateClick = () => {
    onCreateClick(numCards)
  }

  const handleOnCloseClick = () => {
    if (!onCloseClick) return
    onCloseClick()
  }

  return (
    <Modal onOverlayClick={handleOnCloseClick}>
      <div className={styles.opts}>
        <header className={styles.header}>
          <p className={styles.title}># cards:</p>

          <button
            className={`${styles.closeIcon} `}
            disabled={!onCloseClick}
            onClick={handleOnCloseClick}
          >
            &times;
          </button>
        </header>

        <div className={styles.inputCtr}>
          <input
            type='range'
            className={styles.input}
            min={minCards}
            max={maxCards}
            value={numCards}
            onChange={handleNumCardsChange}
          />
          <div className={styles.selectedCardsValue}>{numCards}</div>
        </div>

        <button className={styles.createBtn} onClick={handleOnCreateClick}>
          create
        </button>
      </div>
    </Modal>
  )
}
