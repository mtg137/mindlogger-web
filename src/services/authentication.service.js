import axios from 'axios'
import { apiHost } from './network'
import { btoa } from './helper'

export const signIn = async ({ email, password }) => {
  const url = `${apiHost()}/user/authentication`
  const headers = {
    'Girder-Authorization': `Basic ${btoa(`${email}:${password}`)}`
  }
  try {
    const response = await axios.get(url, { headers })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

export const signUp = async (data) => {
  const url = `${apiHost()}/user`
  try {
    const response = await axios.post(url, null, {
      params: { ...data, admin: true }
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}