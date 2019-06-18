import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}api/cuentos`,
      withCredentials: true
    })
  }

  postNewBook = book => {
    return this.service.post('/newBook', book)
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }


  postNewPage = (page) => {
    //console.log(page)
    return this.service.post(`/addPage`, page)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  postNewText = (text) => {
    return this.service.post('/addText', text)
      .then(res => {
        // console.log("el texto que vuelve de la BBDD", res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  booksList = book => {
    return this.service.get('/', book)
      .then(res => res.data)
      .catch(err => console.log('Error', err))
  }


  UploadPage = (theFile, id) => {
    console.log(theFile)
    console.log(id)
    return this.service.post(`/upload/page/${id}`, theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }
}







/* getGallery = () => {

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
   .then(res => res.data)
   .catch(err => console.log(err))
}

handleUpload = theFile => {

 return this.service.post('/upload', theFile)
   .then(res => res.data)
   .catch(err => console.log(err));
}
} */