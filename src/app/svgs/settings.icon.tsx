export default function IconSettings(props: { classNames?: string }) {
  const { classNames = '' } = props
  const side = 50 // sides of an equilateral triangle
  const shortSide = 1 / 2 * side
  const SQRT3 = Math.sqrt(3)
  const height = shortSide * SQRT3 // height of an equilateral triangle
  return (
    <svg viewBox={`0 ${50 - height} 100 ${2 * height}`} className={`${classNames}`}>
      <path d={`M0 50 L${shortSide} ${50 - height} h${side} L100 50 L${shortSide + side} ${50 + height} h-50 Z`} className="fill-white stroke-none" />
      <circle cx="50" cy="50" r="20" className="fill-black" />
    </svg>
  )
}