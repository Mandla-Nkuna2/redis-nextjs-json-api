import React from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap'

export default function BookForm() {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const form = new FormData(event.target)
    const formData = Object.fromEntries(form.entries())

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const bookId = await res.json()
      if (res.status == 200)
        console.log(`Data successfully submitted: ${bookId}`)
    } catch (err) {
      console.log(`Error: ${err}`)
    }
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <h2>Add a New Book</h2>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="title" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" name="author" placeholder="author" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                name="rating"
                max={10}
                min={1}
                placeholder="rating"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Blurb</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="blurb"
                placeholder="blurb..."
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit" className="btn">
                Add Book
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
