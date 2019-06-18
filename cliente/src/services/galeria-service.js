import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}api/galeria`,
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
    //console.log(image, '----------------------gallery con status--------------')
    return this.service.post('/addImage/', image)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  postImagePage = image => {
    return this.service.post('/addImagePage', image)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  handleUpload = (theFile, status) => {
    console.log(theFile, '----------------------gallery con status--------------')
    theFile.append("status", status);
    return this.service.post('/upload', theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }


}
