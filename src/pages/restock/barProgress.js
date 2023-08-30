const BarProgress = ({
  value,
  max
}) => {
  let color = 'progress-primary'
  if (value < max) {
    color = 'progress-warning'
  }
  if (value > max) {
    color = 'progress-accent'
  }
  return (
    <progress
      className={`progress ${color} w-full`}
      value={value}
      max={max}
    />
  )
}

export default BarProgress
