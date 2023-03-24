import axios from 'axios'

const PhotosUploader = ({formValues, setFormValues, handleChange}) => {
  const addPhotoByLink = async (e) => {
    e.preventDefault()
    const {photos, photoLink} = formValues
    const {data: filename} = await axios.post('/upload-by-link', {link: photoLink})
    setFormValues({...formValues, photos: [...photos, filename], photoLink: ''})
  }

  const uploadPhoto = async (e) => {
    const {photos} = formValues
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    try {
      const response = await axios.post('/upload', data, {
        headers: {'Content-type': 'multipart/form-data'}
      });
      const { data: filenames } = response;
      setFormValues({...formValues, photos: [...photos, ...filenames]})
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <label className='text-xl px-1 font-medium'>Photos</label>
        <div className='flex gap-1'>
          <input
          name="photoLink"
          type="text"
          value={formValues.photoLink}
          placeholder='Add using a link'
          onChange={handleChange}
          />
          <button onClick={addPhotoByLink} className='bg-gray-200 px-2 my-1 rounded-xl font-medium'>Add&nbsp;photo</button>
        </div>
        <div className='mt-2 grid grid-cols-3 gap-3 justify-between items-center'>
        {formValues.photos.map(link => (
          <div className='flex h-32' key={link}>
            <img
              src={axios.defaults.baseURL + '/uploads/' + link} 
              className='rounded-xl border border-gray-300 w-full object-cover'
              alt={link}
              />
            </div>
        ))}
          <label className='flex items-center justify-center border border-gray-300 bg-transparent rounded-xl h-32 text-lg text-gray-600 cursor-pointer'>
            <input type="file" multiple className='hidden' onChange={uploadPhoto}/>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
          </label>
        </div>
    </div>
  )
}

export default PhotosUploader