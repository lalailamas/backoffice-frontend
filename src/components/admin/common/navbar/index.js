// import Bell from '../bell'

export default function Navbar (props) {
  const { toggle } = props

  return (
    <div className='navbar bg-d-soft-soft-purple text-d-dark-dark-purple'>
      <label htmlFor='my-drawer' onClick={() => toggle()} className='btn btn-square btn-ghost drawer-button'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-5 h-5 stroke-current'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' /></svg>
      </label>
      <div className='flex justify-end w-full'>

        {/* <div className='cursor-pointer pr-4'>
          <Bell />
        </div> */}

      </div>
    </div>
  )
}
