import type { NextPage } from 'next'
import BookForm from '../lib/BookForm'
import React from 'react'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Create a Book</h1>
      <BookForm />
    </div>
  )
}

export default Home
