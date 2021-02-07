import axios from 'axios';

const G = window.g

axios.defaults.timeout = 5000
axios.defaults.baseURL = G ? G.url : process.env.VUE_APP_BASE_API
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

const http = {
  get(url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params,
        headers: headers
      })
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        })
    })
  },

  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
    })
  },

  put(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, data)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
    })
  },

  delete(url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, { data: data })
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
    })
  }
}

export { http }
