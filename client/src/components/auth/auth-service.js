
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL}`,
    withCredentials: true
  }),
  login(email, password) {
    return this.service.post('/auth/login', { email, password })
      .then(response => { console.log("data", response.data) })
  },
  signup(username, password) {
    return this.service.post('/auth/signup', {
      username,
      password
    })
      .then(response => response.data)
  },
  loggedin() {
    return this.service.get('/auth/loggedin')
      .then(response => response.data)
  },
  logout() {
    return this.service.get('/auth/logout', {})
      .then(response => response.data)
  }

};