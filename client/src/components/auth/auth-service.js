
import axios from 'axios';

export default {
  service: axios.create({
    baseURL: `${process.env.REACT_APP_APIURL || ""}/auth`,
    withCredentials: true
  }),

  login(username, password) {
    return this.service.post('/auth/login', { username, password })
      .then(response => response.data)
  },

  signup(username, password) {
    return this.service.post('/auth/signup', {
      username,
      email,
      location,
      password
    })
      .then(response => response.data)
  },

  loggedin() {
    return this.service.get('auth/loggedin')
      .then(response => response.data)
  },

  logout() {
    return this.service.get('auth/logout', {})
      .then(response => response.data)
  }

};