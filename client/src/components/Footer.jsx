import { Link, useLocation } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';

function Footer({FRONTENDURL}) {
  const { user } = useContext(UserContext)
  const location = useLocation()
  const [currentLocation, setCurrentLocation] = useState('');
  const [screenSize, setScreenSize] = useState('');

  useEffect(() => {
    setCurrentLocation(window.location.href);

    const handleResize = () => {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [location]);

  if (currentLocation.includes(FRONTENDURL + '/listing') && screenSize < 640) {
    return (
      <div></div>
    )
  } else {
    return (
      <div className="flex sm:hidden fixed bottom-0 w-full bg-white text-gray-400 border-t border-gray-200">
        <div className="mx-auto py-6 gap-5 flex items-center justify-center">
          <Link className='text-xs' to={'/index'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-6 h-6 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="miter-clip" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
              Search
          </Link>
          <Link className='text-xs' to={'/account'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
              {user ? 'Account' : 'Log in'}
          </Link>
        </div>
      </div>
  );
}
}

export default Footer;