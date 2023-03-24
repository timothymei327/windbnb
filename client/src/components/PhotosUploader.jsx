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

  const deletePhoto = async (e, fileName) => {
    e.preventDefault()
    const {photos} = formValues
    await axios.delete('/photos', {data: {fileName}})
    setFormValues({...formValues, photos: [...photos.filter(photo => photo !== fileName)]})  
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
          <div className='flex h-32 relative' key={link}>
            <img
              src={axios.defaults.baseURL + '/uploads/' + link} 
              className='rounded-xl border border-gray-300 w-full object-cover'
              alt={link}
              />
              <button onClick={e => deletePhoto(e, link)} className='absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-full p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
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