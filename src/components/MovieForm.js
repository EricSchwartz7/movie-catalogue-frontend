import React, { Component } from 'react'
import { Form, Message } from 'semantic-ui-react'

class MovieForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      id: '',
      title: '',
      storyline: '',
      genres: [],
      release_date: '',
      imdb_link: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGenreAdd = this.handleGenreAdd.bind(this);
  }

  componentWillMount(){
    if (this.props.type === "edit"){
      this.setState({
        id: this.props.movie.id,
        title: this.props.movie.title,
        storyline: this.props.movie.storyline,
        genres: this.props.movie.genres,
        release_date: this.props.movie.release_date,
        imdb_link: this.props.movie.imdb_link
      });
    };
  }

  handleChange(e, {name, value}){
    this.setState({[name]: value});
  }

  handleGenreAdd(e, genres){
    this.setState({genres: genres.value});
  }

  handleSubmit(){
    if (this.props.type === 'edit'){
      this.props.onEditSubmit(this.state);
    } else {
      this.props.onCreateSubmit(this.state);
    };
    this.state = {
      id: '',
      title: '',
      storyline: '',
      genres: [],
      release_date: '',
      imdb_link: ''
    };
  }

  render(){
    const { title, storyline, genres, release_date, imdb_link } = this.state
    const allGenres = this.props.allGenres.map( (genre) => {
      return {text: genre, value: genre};
    })

    return(
      <div>
        <Form error={this.props.error} success={this.props.success} onSubmit={this.handleSubmit}>
          <Form.Input label='Title' placeholder={title} name='title' value={title} onChange={this.handleChange} />
          <Message
            error
            header='Title Required'
            content='Please enter the title of the movie.'
          />
          <Form.TextArea label='Storyline' placeholder={storyline} name='storyline' value={storyline} onChange={this.handleChange} />
          <Form.Select multiple search selection label='Genre' options={allGenres} value={genres} name='genre' onChange={this.handleGenreAdd} />
          <Form.Input label='Release Date' type='date' placeholder={release_date} name='release_date' value={release_date} onChange={this.handleChange} />
          <Form.Input label='IMDB Link' type='url' placeholder={imdb_link} name='imdb_link' value={imdb_link} onChange={this.handleChange} />
          <Message
            success
            header='Form Completed'
            content='Your movie has been added to the catalogue.'
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default MovieForm;
