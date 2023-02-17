import {Link} from 'react-router-dom'

const Login = () => {
  return(
    <div className="grow flex items-center justify-around">
      <div className="mb-52 border border-gray-400 rounded-xl sm:max-w-md max-w-[80%] mx-auto p-9">
        <h1 className="text-md font-semibold text-center border-b-2 pb-3 mb-4">Log in</h1>
        <h1 className="text-2xl font-medium mb-2">Welcome back to Windbnb</h1>
        <form>
          <input type='email' placeholder='Email'/>
          <input type='password' placeholder='Password'/>
          <button className="primary">Login</button>
          <div className='py-2 text-center'>Don't have an account yet? <Link to={'/signup'} className='text-blue-500 font-medium'>Sign Up</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Login