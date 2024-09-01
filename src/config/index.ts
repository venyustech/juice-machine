import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GATEWAY_URL
})

export class UnexpectedError extends Error {
  constructor(message = 'Ops! Um erro aconteceu') {
    super(message)
    this.name = 'UnexpectedError'
  }
}
