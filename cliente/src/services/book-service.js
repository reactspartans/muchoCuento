import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}api/cuentos`,
      withCredentials: true
    })
  }

  getUserBook = id => {
    return this.service.get(`/mybooks/${id}`)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  postNewBook = book => {
    console.log(book)
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
        console.log("el texto que vuelve de la BBDD", res.data)
        return res.data
      })
      .catch(err => console.log(err))
  }

  booksList = book => {
    return this.service.get('/', book)
      .then(res => res.data)
      .catch(err => console.log('Error', err))
  }


  UploadPage = (theFile) => {
    console.log(theFile, '===================axios cloudinary composicion imagen')
    return this.service.post(`/upload/page`, theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  UpdateBook = (pagesToView, id) => {
    console.log(pagesToView, '**************pagesToView Axios')
    return this.service.put(`/update/${id}`, { pagesToView })
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  bookDetail = (id) => {
    return this.service.get(`/tales-viewer/${id}`)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  bookEdit = (id) => {
    return this.service.get(`/tales-edititor/${id}`)
      .then(res => res.data)
      .catch(err => console.log(err))


  }




}









