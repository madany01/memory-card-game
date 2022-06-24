import genId from '../../genId'

const INCREASE_SCORE_CNT = 'INCREASE_SCORE_CNT'
const INCREASE_SCORE_DURATION = 'INCREASE_SCORE_DURATION'
const RESET_SCORE = 'RESET_SCORE'

const SCORE_ACTION_TYPE = {
  INCREASE_SCORE_CNT,
  INCREASE_SCORE_DURATION,
  RESET_SCORE,
}

const INITIAL_SCORE = { id: genId(), cnt: 0, duration: 0 }

function scoreReducer(state, action) {
  switch (action.type) {
    case INCREASE_SCORE_CNT:
      return { ...state, cnt: state.cnt + 1 }

    case INCREASE_SCORE_DURATION:
      return { ...state, duration: state.duration + action.amount }

    case RESET_SCORE:
      return { ...INITIAL_SCORE, id: genId() }

    default:
      throw new Error(`unknown action type '${action.type}'`)
  }
}

function compareScores(
  { cnt: cntA, duration: durationA },
  { cnt: cntB, duration: durationB }
) {
  if (cntA !== cntB) return cntA < cntB ? -1 : +1
  // eslint-disable-next-line no-nested-ternary
  return durationA === durationB ? 0 : durationA > durationB ? -1 : +1
}

export {
  SCORE_ACTION_TYPE,
  INCREASE_SCORE_CNT,
  INCREASE_SCORE_DURATION,
  RESET_SCORE,
  INITIAL_SCORE,
  compareScores,
  scoreReducer,
}
