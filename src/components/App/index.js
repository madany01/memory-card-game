import { useState, useReducer, useEffect } from 'react'

import {
  INITIAL_NUM_CARDS,
  MAX_CARDS,
  MIN_CARDS,
  NUM_IMAGES,
  TIMER_TICK,
} from '../../configs'
import { choices as randChoices, shuffle } from '../../randoms'
import genId from '../../genId'

import Header from '../Header'
import MainCtr from '../MainCtr'
import Cards from '../Cards'
import GameOpts from '../GameOpts'
import ImagesLoader from '../ImageLoading'
import GameOver from '../GameOver'
import Footer from '../Footer'

import styles from './style.module.css'
import {
  compareScores,
  INCREASE_SCORE_CNT,
  INCREASE_SCORE_DURATION,
  INITIAL_SCORE,
  RESET_SCORE,
  scoreReducer,
} from './scoreReducer'

function saveMaxScoreToLocalStorage(score) {
  const { id: _, ...restScore } = score
  localStorage.setItem('maxScore', JSON.stringify(restScore))
}

function loadMaxScore() {
  const stored = localStorage.getItem('maxScore')
  if (!stored) return { ...INITIAL_SCORE, id: genId() }
  return { ...JSON.parse(stored), id: genId() }
}

function getPlaceholderImages(n) {
  return new Array(n).fill(null).map(() => `${process.env.PUBLIC_URL}/pokemonBall.png`)
}

const ALL_IMAGE_URLS = new Array(NUM_IMAGES)
  .fill(null)
  .map((_, idx) => `${process.env.PUBLIC_URL}/images/${idx}.png`)

const GAME_STATE = {
  initial: 'initial',
  loading: 'loading images',
  playing: 'playing',
  gameOverWithDup: 'gameOver with duplication',
  gameOverWithoutDup: 'gameOver without duplication',
}

export default function App() {
  const [gameStatus, setGameStatus] = useState(GAME_STATE.initial)
  const [score, dispatchScore] = useReducer(scoreReducer, INITIAL_SCORE)
  const [maxScore, setMaxScore] = useState(loadMaxScore)
  const [cardUrls, setCardUrls] = useState(null)
  const [selectedCards, setSelectedCards] = useState(new Set())

  useEffect(() => {
    if (gameStatus !== GAME_STATE.playing) return undefined

    const interval = setInterval(() => {
      dispatchScore({ type: INCREASE_SCORE_DURATION, amount: TIMER_TICK })
    }, TIMER_TICK)

    return () => clearInterval(interval)
  }, [gameStatus])

  useEffect(() => {
    if (compareScores(maxScore, score) !== -1) return

    setMaxScore(score)
    saveMaxScoreToLocalStorage(score)
  }, [score, maxScore])

  const numCards = cardUrls?.length || INITIAL_NUM_CARDS
  const isGameOver = [GAME_STATE.gameOverWithDup, GAME_STATE.gameOverWithoutDup].includes(
    gameStatus
  )
  const maxScoreAchieved = score.id === maxScore.id

  const handleCreateGameClick = selectedNumCards => {
    setGameStatus(GAME_STATE.loading)
    setCardUrls(randChoices(ALL_IMAGE_URLS, selectedNumCards))
  }

  const resetStates = () => {
    dispatchScore({ type: RESET_SCORE })
    setCardUrls(null)
    setSelectedCards(new Set())
  }

  const handleResetClick = () => {
    setGameStatus(GAME_STATE.initial)
    resetStates()
  }

  const handleRestartClick = () => {
    resetStates()
    handleCreateGameClick(numCards)
  }

  const handleLoadingImagesComplete = () => {
    setGameStatus(GAME_STATE.playing)
  }

  const handleCardClick = url => {
    if (selectedCards.has(url)) {
      // put the duplicate selected card at last position so that Cards can highlight it with red
      setSelectedCards(new Set([...[...selectedCards].filter(u => u !== url), url]))
      setGameStatus(GAME_STATE.gameOverWithDup)
      return
    }

    setSelectedCards(new Set([...selectedCards, url]))
    dispatchScore({ type: INCREASE_SCORE_CNT })

    if (selectedCards.size !== cardUrls.length - 1) {
      setCardUrls(shuffle(cardUrls))
      return
    }

    setGameStatus(GAME_STATE.gameOverWithoutDup)
  }

  return (
    <div className={styles.app}>
      <Header
        score={score}
        maxScore={maxScore}
        onReset={gameStatus !== GAME_STATE.initial && handleResetClick}
        onRestart={
          ![GAME_STATE.initial, GAME_STATE.loading].includes(gameStatus) &&
          handleRestartClick
        }
      />

      <MainCtr
        backgroundIndicator={
          (((gameStatus === GAME_STATE.gameOverWithDup && maxScoreAchieved) ||
            gameStatus === GAME_STATE.gameOverWithoutDup) &&
            'green') ||
          (gameStatus === GAME_STATE.gameOverWithDup && 'red')
        }
      >
        {gameStatus === GAME_STATE.initial && (
          <GameOpts
            initialCards={numCards}
            minCards={MIN_CARDS}
            maxCards={MAX_CARDS}
            onCreateClick={handleCreateGameClick}
          />
        )}

        {gameStatus === GAME_STATE.loading && (
          <ImagesLoader urls={cardUrls} onStartClick={handleLoadingImagesComplete} />
        )}

        <Cards
          onClick={gameStatus === GAME_STATE.playing && handleCardClick}
          imgUrls={
            [GAME_STATE.initial, GAME_STATE.loading].includes(gameStatus)
              ? getPlaceholderImages(numCards)
              : cardUrls
          }
          greenBorder={
            (gameStatus === GAME_STATE.gameOverWithDup &&
              [...selectedCards].slice(0, -1)) ||
            (gameStatus === GAME_STATE.gameOverWithoutDup && [...selectedCards])
          }
          redBorder={
            gameStatus === GAME_STATE.gameOverWithDup && [...selectedCards].slice(-1)
          }
        />

        {isGameOver && (
          <GameOver
            score={score}
            isMaxScore={maxScoreAchieved}
            gameStatus={gameStatus}
            onAgain={handleRestartClick}
          />
        )}
      </MainCtr>

      <Footer />
    </div>
  )
}
