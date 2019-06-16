import axios from 'axios'

export default class services {

  constructor() {

    this.service = axios.create({
      baseURL: 'http://localhost:3000/prof',
      withCredentials: true
    })
  }


    uploadProfile = theFile => {
        return this.service.post('/uploadprofile', theFile)
          .then(response => response.data)
          .catch(err => console.log(err))

    }

    updatePhoto = (thePhoto, _id)=>{

      return this.service.post(`/private/profile/${_id}`, thePhoto)
        .then(res=>res.data)
        .catch(err=>console.log(err))
    }
}