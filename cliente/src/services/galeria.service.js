import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/api/galeria'
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

  postCoaster = image => {
    return this.service.post('/addImagePage', image)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  postImageGallery = image => {
    return this.service.post('/addImage/:_id', image)
      .then(res => res.data)
      .catch(err => console.log(err))
  }
}