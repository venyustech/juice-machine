import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://testecolab.onrender.com'
})

export class UnexpectedError extends Error {
  constructor(message = 'Ops! Um erro aconteceu') {
    super(message)
    this.name = 'UnexpectedError'
  }
}
