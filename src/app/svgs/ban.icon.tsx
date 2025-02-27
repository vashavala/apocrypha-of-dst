export default function IconBan(props: { classNames?: string }) {
  const { classNames = '' } = props
  const side = 45
  const { SQRT1_2 } = Math
  const height2 = side * SQRT1_2
  return (
    <svg viewBox={`0 0 100 100`} className={`${classNames}`}>
      <circle cx="50" cy="50" r={side} className="fill-none stroke-[10] stroke-red-600" />
      <path d={`M${50 - height2} ${50 + height2} L${50 + height2} ${50 - height2}`} className="fill-none stroke-[10] stroke-red-600" />
    </svg>
  )
}