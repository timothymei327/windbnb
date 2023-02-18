import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  let navigate = useNavigate()

  const [error, setError] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/signup', formValues)
      alert('Congratulations, your account has been successfully created!')
      setFormValues({
        name: '',
        email: '',
        password: ''
      })
      navigate('/login')
    } catch(e) {
      setError('Error: ' + e.response.data.error)
    }}

  return(
    <div className="grow flex items-center justify-around">
      <div className="mb-52 border border-gray-400 rounded-xl sm:max-w-md max-w-[80%] mx-auto p-9">
        <h1 className="text-md font-semibold text-center border-b-2 pb-3 mb-4">Sign up</h1>
        <h1 className="text-2xl font-medium mb-2">Welcome to Windbnb</h1>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={handleChange}
            name='name'
            type='text'
            placeholder='Name'
            value={formValues.name}
            required
          />
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
          <button className="primary">Sign up</button>
          <div className='py-2 text-center'>Have an account? <Link to={'/login'} className='text-blue-500 font-medium'>Log in</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Signup