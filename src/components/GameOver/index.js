import { useState } from 'react'

import formatDuration from '../../formatDuration'
import Modal from '../Modal'

import styles from './style.module.css'

export default function GameOver({ score: { cnt, duration }, isMaxScore, onAgain }) {
  const [closed, setClosed] = useState(false)

  return (
    !closed && (
      <Modal onOverlayClick={() => setClosed(true)}>
        <div className={styles.ctr}>
          <header className={styles.header}>
            <button className={styles.close} onClick={() => setClosed(true)}>
              ✖
            </button>
          </header>

          <div className={styles.logs}>
            <div className={`${styles.log}`}>
              <div className={styles.label}>your score:</div>
              <div className={styles.score}>
                {cnt} in {formatDuration(duration)}s
              </div>
            </div>

            {isMaxScore && (
              <div className={`${styles.log} ${styles.achievement}`}>
                you achieved new highest score 🎈
              </div>
            )}
          </div>

          <button onClick={onAgain} className={styles.again}>
            again
          </button>
        </div>
      </Modal>
    )
  )
}
