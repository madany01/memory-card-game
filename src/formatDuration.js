export default function formatDuration(time) {
  return [Math.trunc(time / 1000), (time % 1000) / 10].join(':')
}
