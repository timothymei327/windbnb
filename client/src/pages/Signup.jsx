import {Link} from 'react-router-dom'

const Signup = () => {
  return(
    <div className="grow flex items-center justify-around">
      <div className="mb-52 border border-gray-400 rounded-xl sm:max-w-md max-w-[80%] mx-auto p-9">
        <h1 className="text-md font-semibold text-center border-b-2 pb-3 mb-4">Sign up</h1>
        <h1 className="text-2xl font-medium mb-2">Welcome to Windbnb</h1>
        <form>
          <input type='text' placeholder='Name'/>
          <input type='email' placeholder='Email'/>
          <input type='password' placeholder='Password'/>
          <button className="primary">Sign up</button>
          <div className='py-2 text-center'>Have an account? <Link to={'/login'} className='text-blue-500 font-medium'>Log in</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Signup