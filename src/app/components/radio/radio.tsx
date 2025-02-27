type RadioOption = {
  label: string
  value: string
}

type RadioProps = {
  radioSetName: string
  selectOneInGroup: (value: string) => void
  selected: string
  groupDisabled?: boolean
} & RadioOption

type RadioGroupProps = {
  options: RadioOption[]
  radioSetName: string
  selectOneInGroup: (value: string) => void
  selected: string
  groupDisabled?: boolean
  className?: string
}

export const Radio = (props: RadioProps) => {
  const { label, radioSetName, selectOneInGroup, value, selected, groupDisabled } = props
  return (
    <label className={`
      h-[2rem] px-[.4rem]
      border-[.1rem] rounded-[.4rem] cursor-pointer
      flex items-center gap-[.4rem]
    `} key={value}>
      <div className="aspect-square w-[1rem] rounded-full border flex items-center justify-center">
        <div className={`aspect-square w-[.6rem] rounded-full bg-[var(--tc)] ${selected === value ? '' : 'hidden'}`}></div>
      </div>
      <input
        type="radio"
        name={radioSetName}
        onChange={() => selectOneInGroup(value)}
        checked={selected === value}
        disabled={groupDisabled}
        className="hidden"
      />
      <span>{label}</span>
    </label>
  )
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { options, radioSetName, selectOneInGroup, selected, groupDisabled, className = '' } = props
  return (
    <div role="radiogroup" className={`${groupDisabled && `blur cursor-not-allowed`} ${className}`}>
      {options.map((option: RadioOption) => (
        <Radio
          key={option.value}
          radioSetName={radioSetName}
          selectOneInGroup={selectOneInGroup}
          selected={selected}
          label={option.label}
          value={option.value}
          groupDisabled={groupDisabled}
        />
      ))}
    </div>
  )
}