import React, { Component } from 'react'
import axios from 'axios'
import { Form } from 'semantic-ui-react'

axios.defaults.baseURL = 'http://localhost:3000/api/v1'

class MovieForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: '',
      storyline: '',
      genres: [],
      release_date: '',
      imdb_link: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, {name, value}){
    this.setState({[name]: value});
  }

  handleGenreAdd(e, genres){
    this.setState({genres: genres.value});
  }

  handleSubmit(){
    this.props.onCreateSubmit(this.state);
  }

  render(){
    const { title, storyline, release_date, imdb_link } = this.state
    const allGenres = this.props.allGenres.map( (genre) => {
      return {text: genre, value: genre}
    })

    return(
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input label='Title' placeholder='Title' name='title' value={title} onChange={this.handleChange} />
          <Form.TextArea label='Storyline' placeholder='Storyline' name='storyline' value={storyline} onChange={this.handleChange} />
          <Form.Select multiple search selection label='Genre' options={allGenres} placeholder='Genre' name='genre' onChange={this.handleGenreAdd} />
          <Form.Input label='Release Date' type='date' placeholder='Release Date' name='release_date' value={release_date} onChange={this.handleChange} />
          <Form.Input label='IMDB Link' type='url' placeholder='IMDB Link' name='imdb_link' value={imdb_link} onChange={this.handleChange} />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default MovieForm;
