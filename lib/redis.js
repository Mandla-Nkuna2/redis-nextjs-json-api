import { createClient } from 'redis'
import { Schema, Repository, EntityId } from 'redis-om'

const redisClient = createClient({ url: process.env.REDIS_URL })
redisClient.on('error', (err) => console.log('Redis Client Error', err))

async function connect() {
  if (!redisClient.isOpen) {
    await redisClient.connect(process.env.REDIS_URL)
  }
}

export async function createBook(data) {
  await connect()

  let bookSchema = new Schema(
    'Book',
    {
      title: { type: 'string' },
      rating: { type: 'string' },
      author: { type: 'string' },
      blurb: { type: 'string' },
    },
    { dataStructure: 'JSON' }
  )
  const bookRepository = new Repository(bookSchema, redisClient)

  const book = await bookRepository.save(data)
  return book[EntityId]
}

export async function closeConnection() {
  if (redisClient.isOpen) await redisClient.quit()
}
