import React, { Component } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Movie from './Movie'
import MovieForm from './MovieForm'
import { List, Grid, Message } from 'semantic-ui-react'
import SearchInput, {createFilter} from 'react-search-input'

axios.defaults.baseURL = 'http://localhost:3000/api/v1'

class MoviesList extends Component {

  constructor(props){
    super(props);

    this.state = {
      movies: [],
      allGenres: [],
      selected: {},
      error: false,
      success: false,
      deleted: false,
      searchTerm: ""
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  componentWillMount() {
    this.getMovies();
    this.getGenres();
  }

  getMovies(){
    axios.get('/movies')
      .then( (response) => {
        this.setState({movies: response.data});
      });
  }

  getGenres(){
    axios.get('/genres')
      .then( (response) => {
        const genres = response.data.map( genre => genre.name );
        this.setState({allGenres: genres});
      })
  }

  handleClick(movie, e){
    this.setState({selected: movie, deleted: false});
  }

  handleFormSubmit(movie){
    axios.post('/movies', movie)
      .then( (response) => {
        this.getMovies();
        if (response.data === "error"){
          this.setState({
            error: true,
            success: false
          });
        } else {
          this.setState({
            error: false,
            success: true,
            selected: response.data,
            deleted: false
          });
        }
      });
  }

  handleUpdate(movie){
    axios.patch(`/movies/${movie.id}`, movie)
      .then( () => this.getMovies());
    this.setState({selected: movie});
  }

  handleDelete(movie){
    axios.delete(`/movies/${movie.id}`)
      .then( () => this.getMovies());
    this.setState({
      selected: {},
      error: false,
      success: false,
      deleted: true
    });
  }

  searchUpdated(term){
    this.setState({searchTerm: term});
  }

  render() {

    const filteredMovies = this.state.movies.filter(createFilter(this.state.searchTerm, 'title'))

    return(
      <div>
        <Grid columns={3} padded>
          <Grid.Column>
            <MovieForm
              type="create"
              error={this.state.error}
              success={this.state.success}
              onCreateSubmit={this.handleFormSubmit}
              allGenres={this.state.allGenres}/>
          </Grid.Column>
          <Grid.Column>
            <SearchInput className="search-input" onChange={this.searchUpdated} />
            <Router>
              <List>
                {filteredMovies.map( (movie, i) =>
                  <List.Item key={i}>
                    <Link
                      id={movie.id}
                      onClick={this.handleClick.bind(this, movie)}
                      to={`/movie/${movie.title}`}>
                      {movie.title}
                    </Link>
                  </List.Item>)}
              </List>
            </Router>
          </Grid.Column>
          <Grid.Column>
            {this.state.deleted ?
              <Message
                success
                header='Movie Deleted'
                content='Your movie has been successfully deleted from the catalogue.'
              /> :
              <Movie
                movie={this.state.selected}
                onUpdate={this.handleUpdate}
                onDelete={this.handleDelete}
                allGenres={this.state.allGenres}
              />}
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default MoviesList
