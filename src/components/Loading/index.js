import Modal from '../Modal'
import Spinner from '../Spinner'
import ProgressBar from '../ProgressBar'
import styles from './style.module.css'

export default function Loading({ numerator, denominator, children }) {
  const completeRatio = numerator / denominator
  const done = numerator === denominator

  return (
    <Modal>
      <div className={styles.ctr}>
        <Spinner spin={!done} />
        <ProgressBar completeRatio={completeRatio} />
        <div className={styles.msg}>
          Loading {numerator}/{denominator} ..
        </div>
        {children}
      </div>
    </Modal>
  )
}
