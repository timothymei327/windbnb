import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }


  //NEED TO COMPLETE HANDLESUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formValues)
    await axios.post('/signup', formValues)}
    

  //   await const ({
  //     name: formValues.name,
  //     email: formValues.email,
  //     password: formValues.password
  //   })

  //   setFormValues({
  //     username: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: ''
  //   })
  //   navigate('/')
  // }

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
          <button className="primary">Sign up</button>
          <div className='py-2 text-center'>Have an account? <Link to={'/login'} className='text-blue-500 font-medium'>Log in</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Signup