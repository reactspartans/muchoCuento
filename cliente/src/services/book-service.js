import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/api/cuentos',
      withCredentials: true
    })
  }

  postNewBook = book => {
    return this.service.post('/newBook', book)
      .then(res => res.data)
      .catch(err => console.log(err))
  }


  postNewPage = (id, page) => {
    return this.service.post(`/addPage/${id}`, page)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  postNewText = (text) => {
    return this.service.post('/addText', text)
      .then(res => res.data)
      .catch(err => console.log(err))
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