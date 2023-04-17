const GuestDropdown = ({ optionsCount, bookingValues, setBookingValues }) => {
  const options = Array.from({ length: optionsCount }, (_, index) => index + 1);

  const handleChange = (e) => {
    setBookingValues({ ...bookingValues, [e.target.name]: e.target.value })
  }

  return (
    <div className="text-sm">
      <label htmlFor="number-select">Guests:</label>
      <select
        className="border border-gray-300 rounded-md mx-3"
        id="number-select"
        name="guests"
        value={bookingValues.guests}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GuestDropdown;
