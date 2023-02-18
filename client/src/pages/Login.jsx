import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  return(
    <div className="grow flex items-center justify-around">
      <div className="mb-52 border border-gray-400 rounded-xl sm:max-w-md max-w-[80%] mx-auto p-9">
        <h1 className="text-md font-semibold text-center border-b-2 pb-3 mb-4">Log in</h1>
        <h1 className="text-2xl font-medium mb-2">Welcome back to Windbnb</h1>
        <form>
        <input
            onChange={handleChange}
            name='email'
            type='email'
            placeholder='Email'
            value={formValues.email}
            required
          />
          <input
            onChange={handleChange}
            name='password'
            type='password'
            placeholder='Password'
            value={formValues.password}
            required
          />
          <button className="primary">Login</button>
          <div className='py-2 text-center'>Don't have an account yet? <Link to={'/signup'} className='text-blue-500 font-medium'>Sign Up</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Login