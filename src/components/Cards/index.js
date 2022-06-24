import Card from '../Card'

import styles from './style.module.css'

export default function Cards({ imgUrls, onClick, greenBorder = [], redBorder = [] }) {
  const uniqueUrls = new Set(imgUrls).size === imgUrls.length

  return (
    <ul className={styles.cards}>
      {imgUrls.map((url, idx) => (
        <li key={`${uniqueUrls ? url : idx}`}>
          <Card
            borderColor={
              (greenBorder && greenBorder.includes(url) && 'green') ||
              (redBorder && redBorder.includes(url) && 'red')
            }
            imgUrl={url}
            onClick={onClick && (() => onClick(url))}
          />
        </li>
      ))}
    </ul>
  )
}
