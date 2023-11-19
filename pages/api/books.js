import { createBook, closeConnection } from '../../lib/redis'

export default async function handler(req, res) {
  await createBook(req.body).then(async (bookId) => {
    await closeConnection()
    res.status(200).json(bookId)
  })
}
