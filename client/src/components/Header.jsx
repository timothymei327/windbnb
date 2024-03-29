import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'

const Header = ({FRONTENDURL, showAllPhotos, setShowAllPhotos}) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [screenSize, setScreenSize] = useState('');
  
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleBack = () => {
    if (showAllPhotos) {
      setShowAllPhotos(false)
    } else {
      navigate(-1)
    }
  }

  if ((window.location.href.includes(FRONTENDURL + '/listing') && screenSize < 640) || showAllPhotos) {
    return (
      <div className='fixed z-50 w-screen top-[0px] p-5 bg-white border-b'>
      <button onClick={() => {handleBack()}} className="bg-white rounded-full shadow drop-shadow-md p-2 mx-auto">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      </button>
    </div>
    )
  } else {
    return(
      <div>
      <header className="fixed z-50 w-screen top-[0px] p-5 border-b bg-white flex justify-center sm:justify-between">
        <Link to='/index' className="flex items-center gap-2 hidden sm:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-9 h-9 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="font-semibold text-primary text-xl">windbnb</span>
        </Link>
        <div className="flex items-center text-sm gap-3 border border-gray-300 rounded-full py-2 px-6 shadow-md shadow-gray-300">
          <div className="font-medium">Anywhere</div>
          <div className="border-1 border-l border-gray-300">‎</div>
          <div className="font-medium">Any&nbsp;week</div>
          <div className="border-1 border-l border-gray-300">‎</div>
          <div className="text-gray-500 font-light">Add&nbsp;guests</div>
          <button className="bg-primary text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={4}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <Link to={user ? '/account' : '/login'} className="flex items-center sm:gap-3 gap-1 border border-gray-300 rounded-full py-2 px-3 hidden sm:flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.7}
            stroke="currentColor"
            className="w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="bg-gray-500 text-white rounded-full border-2 border-gray-500 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
      </header>
    </div>
    )
  }
}

export default Header