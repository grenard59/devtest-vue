import {
  API_URL,
  API_CITY,
  MASTER_KEY,
  API_ENDPOINT_CITIES_FETCH,
  API_CITY_COMMENT,
  API_ENDPOINT_CITY_FETCH
} from '../Constants'

const headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('Authorization', `Bearer ${MASTER_KEY}`)

export default {
  /**
   * get all Cities from database
   */
  async getCities (text) {
    const res = await fetch(API_URL + API_CITY + API_ENDPOINT_CITIES_FETCH + text, {
      method: 'GET',
      headers: headers
    })
    const data = await res.json()
    return data
  },

  async getComment (socket, city) {
    socket.emit('getComment', city)
  },

  /**
   * get one city from database
   */
  async getCity (id) {
    const res = await fetch(API_URL + API_CITY + API_ENDPOINT_CITY_FETCH + id, {
      method: 'GET',
      headers: headers
    })
    return res.json()
  },

  /**
   * Add a new comment
   */
  async addComment (city, message, author) {
    console.log(city, message, author)
    const res = await fetch(API_URL + API_CITY + API_CITY_COMMENT, {
      method: 'POST',
      body: JSON.stringify({
        city,
        message,
        author
      }),
      headers: headers
    })
    const data = await res.json()
    return data
  }
}
