type CheckboxOption = {
  label?: string
  value: string
  customChildren?: React.ReactNode
}

type CheckboxProps = {
  checkboxSetName: string
  toggleOneInGroup: (value: string) => void
  selectedGroup: string[]
  groupDisabled?: boolean
} & CheckboxOption

type CheckboxGroupProps = {
  options: CheckboxOption[]
  checkboxSetName: string
  toggleOneInGroup: (value: string) => void
  selectedGroup: string[]
  groupDisabled?: boolean
  classNames?: string
}

export const Checkbox = (props: CheckboxProps) => {
  const { checkboxSetName, value, label, toggleOneInGroup, selectedGroup, groupDisabled = false, customChildren = null } = props
  return (
    <label className={`
      h-[2rem] px-[.4rem]
      border-[.1rem] rounded-[.4rem] cursor-pointer
      flex items-center gap-[.4rem]
    `} key={value}>
      <div className="aspect-square w-[1rem] border flex items-center justify-center rounded-[.1rem]">
        <div className={`aspect-square w-[.6rem] bg-[var(--tc)] rounded-[.1rem] ${selectedGroup.includes(value) ? '' : 'hidden'}`}></div>
      </div>
      <input
        type="checkbox"
        name={checkboxSetName}
        onChange={() => toggleOneInGroup(value)}
        checked={selectedGroup.includes(value)}
        disabled={groupDisabled}
        className="hidden"
      />
      {customChildren || <span>{label}</span>}
    </label>
  )
}

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { options, checkboxSetName, toggleOneInGroup, selectedGroup, groupDisabled = false, classNames = '' } = props
  return (
    <div className={`${groupDisabled && `blur-[1px] cursor-not-allowed *:cursor-not-allowed`} ${classNames}`}>
      {options.map(option => (
        <Checkbox
          key={option.value}
          checkboxSetName={checkboxSetName}
          toggleOneInGroup={toggleOneInGroup}
          selectedGroup={selectedGroup}
          label={option.label}
          value={option.value}
          customChildren={option.customChildren}
          groupDisabled={groupDisabled}
        />
      ))}
    </div>
  );
}
