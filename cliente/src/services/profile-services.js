import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000',
      withCredentials: true
    })
  }


    uploadProfile = theFile => {
        return this.service.post('/uploadprofile', theFile)
          .then(response => response.data)
          .catch(err => console.log(err))

    }
}