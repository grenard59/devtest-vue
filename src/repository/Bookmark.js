import { API_URL, API_BOOKMARK, MASTER_KEY } from '../Constants'

const headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('Authorization', `Bearer ${MASTER_KEY}`)

export default {
  async getBookmarks () {
    const res = await fetch(API_URL + API_BOOKMARK, {
      method: 'GET',
      headers: headers
    })
    const data = await res.json()
    return data
  },

  async addBookmark (city, message = null) {
    const res = await fetch(API_URL + API_BOOKMARK, {
      method: 'POST',
      body: JSON.stringify({
        city,
        message
      }),
      headers: headers
    })
    const data = await res.json()
    return data
  },

  async deleteBookmark (city) {
    const res = await fetch(API_URL + API_BOOKMARK + city, {
      method: 'DELETE',
      headers: headers
    })
    const data = await res.json()
    return data
  }

}
