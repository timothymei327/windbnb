import { Link } from 'react-router-dom'

const Homes = () => {
  return (
    <div>
      <div className='text-center'>
        <Link to={'/account/homes/new'} className='inline-flex gap-1 bg-primary text-white py-2 px-5 rounded-full' >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
        </svg>
          Add new Windbnb</Link>
      </div>
    </div>
  )
}

export default Homes