import axios from 'axios'

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:3000/auth',
            withCredentials: true
        })
    }

    signup = (username, email, password) => {
        return this.service.post('/signup', { username, email, password })
            .then(response => response.data)
            .catch(err=> console.log(err))
    }

    login = (username, password) => {
        console.log(username, password)
        return this.service.post('/login', { username, password })
            .then(response => response.data)
    }

    logout = () => {
        return this.service.post('/logout', {})
            .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then(response => response.data)
    }

}



      