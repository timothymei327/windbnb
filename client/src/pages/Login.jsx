const Login = () => {
  return(
    <div className="mt-10 border border-gray-400 rounded-xl max-w-[80%] mx-auto p-9">
      <h1 className="text-md font-semibold text-center border-b-2 pb-3 mb-4">Log in</h1>
      <h1 className="text-2xl font-medium mb-2">Welcome back to Windbnb</h1>
      <form>
        <input type='email' placeholder='Email'/>
        <input type='password' placeholder='Password'/>
        <button className="primary">Login</button>
      </form>
    </div>
  )
}

export default Login