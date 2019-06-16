import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/api/galeria',
      withCredentials: true
    })
  }

  getGallery = () => {

    return this.service.get('/')
      .then(res => res.data)
      .catch(err => console.log('Error', err))
  }


  getImageGallery = id => {
    return this.service.get(`/${id}`)
      .then(res => res.data)
      .catch(err => console.log('Error', err))
  }


  postImageGallery = image => {
    return this.service.post('/addImage/', image)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  postImagePage = image => {
    return this.service.post('/addImagePage', image)
      .then(res => console.log(res.data, image))
      .catch(err => console.log(err))
  }

  handleUpload = theFile => {

    return this.service.post('/upload', theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  uploadProfile = theFile => {
    return this.service.post('/uploadprofile', theFile)
      .then(response => response.data)
      .catch(err => console.log(err))

  }
}
