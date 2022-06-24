import { useEffect, useState } from 'react'
import Loading from '../Loading'

import styles from './style.module.css'

export default function ImagesLoader({ urls, onStartClick }) {
  const [numCompleted, setNumCompleted] = useState(0)

  useEffect(() => {
    let images = new Array(urls.length).fill(null).map(() => new Image())

    const increase = () => {
      if (images === null) return
      setNumCompleted(c => c + 1)
    }

    images.forEach((image, idx) => {
      image.onload = increase
      image.src = urls[idx]
    })

    return () => {
      images.forEach(image => (image.src = ''))
      images = null
      setNumCompleted(0)
    }
  }, [urls])

  return (
    <div>
      <Loading numerator={numCompleted} denominator={urls.length}>
        <button
          className={styles.startBtn}
          onClick={onStartClick}
          disabled={numCompleted !== urls.length}
        >
          start
        </button>
      </Loading>
    </div>
  )
}
