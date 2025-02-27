export default function __Artboard(props: { classNames?: string }) {
  const { classNames = '' } = props
  const side = 45 // sides of an equilateral triangle
  const shortSide = 1 / 2 * side
  const SQRT3 = Math.sqrt(3)
  const height = shortSide * SQRT3 // height of an equilateral triangle
  const supportLineArray = [...Array(11)].map((_, i) => i)

  const { SQRT1_2 } = Math
  const height2 = side * SQRT1_2
  return (
    <svg viewBox={`20 0 60 100`} className={`${classNames} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] h-[50vh] bg-[var(--bgc)]`}>
      {supportLineArray.map(num => (
        <path key={num} className="fill-none stroke-[var(--tc)] stroke-1" d={`M0 ${num * 10} h100`} />
      ))}
      {supportLineArray.map(num => (
        <path key={num} className="fill-none stroke-[var(--tc)] stroke-1" d={`M${num * 10} 0 v100`} />
      ))}

      {/* <path d={`M${50 - side / 2} ${height} h${side} L50 0 Z`} className="fill-white stroke-none" /> */}
      {/* <path d={`M${50 - side / 2} ${100 - height} h${side} L50 100 Z`} className="fill-white stroke-none" /> */}
      <path d={`m20 40 h60 L50 0 z`} className="fill-white stroke-none" />
      <path d={`m20 60 h60 L50 100 z`} className="fill-white stroke-none" />

    </svg>
  )
}