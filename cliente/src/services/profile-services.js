import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}prof`,
      withCredentials: true
    })
  }


  uploadProfile = (theFile, id) => {
    console.log("Services, mira a ver el id", id)
    return this.service.post(`/private/profile/${id}`, theFile)
      .then(response => response.data)
      .catch(err => console.log(err))
  }
}