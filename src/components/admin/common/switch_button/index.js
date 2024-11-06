const SwitchButton = ({
  checked,
  onCheck,
  label
}) => (
  <div className='form-control max-w-xs w-32 m-2'>
    <label className='label cursor-pointer'>
      <span className='label-text text-left w-full font-bold text-d-purple mr-2 '>
        {label}
      </span>
      <input
        type='checkbox'
        className='toggle'
        checked={checked}
        onChange={() => onCheck(!checked)}
      />
    </label>
  </div>
)

export default SwitchButton
