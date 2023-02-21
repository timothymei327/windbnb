import { Link, useParams } from 'react-router-dom'

const Homes = () => {
  const {action} = useParams()

  return (
    <div>
      {action !== 'new' && (
        <div className='text-center'>
          <Link to={'/account/homes/new'} className='inline-flex gap-1 bg-primary text-white py-2 px-5 rounded-full' >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
            Add new Windbnb</Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form className='sm:max-w-xl max-w-[80%] mx-auto py-5'>
            <label className='text-xl px-1 font-medium'>Title</label>
            <input type="text" placeholder='Stylish and Spacious Downtown Apartment'/>
            <label className='text-xl px-1 font-medium'>Address</label>
            <input type="text" placeholder='123 Main St, Anytown, USA'/>
            <label className='text-xl px-1 font-medium'>Photos</label>
            <div className='mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
              <button className='border border-gray-300 bg-transparent rounded-xl p-8 text-2xl text-gray-600'>+</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Homes