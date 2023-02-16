function App() {
  return (
    <div>
      <header className="p-4 flex justify-between">
        <a href="" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="font-bold text-xl">windbnb</span>
        </a>
        <div className="flex items-center text-sm gap-3 border border-gray-300 rounded-full py-2 px-6 shadow-md shadow-gray-300">
          <div className="font-medium">Anywhere</div>
          <div className="border-1 border-l border-gray-300">‎</div>
          <div className="font-medium">Any week</div>
          <div className="border-1 border-l border-gray-300">‎</div>
          <div className="text-gray-500 font-light">Add guests</div>
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
      </header>
    </div>
  )
}

export default App
