import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import './App.css';

const REQUEST_URL = 'https://jsonplaceholder.typicode.com/posts';

class App extends Component {
  state = {
    email: '',
    pass: '',
    checkbox: false
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(REQUEST_URL, {
      method: 'POST',
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state)
    })
      .then(r => r.json())
      .then(data => {
        console.log(data);
        this.setState({
          email: '',
          pass: '',
          checkbox: false
        })
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  render() {
    const { email, pass, checkbox } = this.state;
    return (
      <div className="App">
        <Modal.Dialog>
          <Form onSubmit={this.handleSubmit}>

            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  name="email"
                  onChange={this.handleChange}
                  type="email"
                  placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={pass}
                  name="pass"
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formBasicChecbox">
                <Form.Check
                  onChange={this.handleChange}
                  value={checkbox}
                  name="checkbox"
                  type="checkbox"
                  label="Check me out" />
              </Form.Group>

            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Dialog>

      </div>
    );
  }
}

export default App;
