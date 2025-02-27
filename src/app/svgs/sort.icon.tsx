type SortState = 'off' | 'asc' | 'desc'
export default function Sort(props: { classNames?: string, sortState?: SortState }) {
  const { classNames = '', sortState = 'off' } = props
  const side = 40
  const SQRT3 = Math.sqrt(3)
  const shortSide = side / 2
  const height = shortSide * SQRT3 // height of an equilateral triangle
  return (
    <svg viewBox={`${50 - side / 2} 0 ${side} 100`} className={`${classNames}`}>
      <path d={`M${50 - side / 2} ${height} h${side} L50 0 Z`} className={`stroke-none ${sortState === 'asc' ? 'fill-white' : 'fill-white/50'}`} />
      <path d={`M${50 - side / 2} ${100 - height} h${side} L50 100 Z`} className={`stroke-none ${sortState === 'desc' ? 'fill-white' : 'fill-white/50'}`} />
    </svg>
  )
}