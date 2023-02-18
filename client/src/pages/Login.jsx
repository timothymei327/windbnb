import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()

  const [error, setError] = useState(null)
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await axios.post('/login', formValues)
      alert('Login successful')
      setFormValues({
        email: '',
        password: ''
      })
      navigate('/')
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  return(
    <div className="grow flex items-center justify-around">
      <div className="mb-52 border border-gray-400 rounded-xl sm:max-w-md max-w-[80%] mx-auto p-9">
        <h1 className="text-md font-semibold text-center border-b-2 pb-3 mb-4">Log in</h1>
        <h1 className="text-2xl font-medium mb-2">Welcome back to Windbnb</h1>
        <form onSubmit={handleSubmit}>
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
          {error && <div className='text-red-500 text-center font-semibold'>{error}</div>}
          <button className="primary">Login</button>
          <div className='py-2 text-center'>Don't have an account yet? <Link to={'/signup'} className='text-blue-500 font-medium'>Sign Up</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Login