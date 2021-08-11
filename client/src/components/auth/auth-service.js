
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL}`,
    withCredentials: true
  }),
  login(email, password) {
    return this.service.post('/auth/login', { email, password })
      .then(response => response.data)
  },
  signup(username, email, location, password) {
    return this.service.post('/auth/signup', {
      username,
      email,
      location,
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