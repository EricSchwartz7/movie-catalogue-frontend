import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

class MoviesList extends Component {

  handleClick(movie){
    this.props.onClick(movie);
  }

  render(){
    return(
      <Router>
        <List>
          {this.props.movies.map( (movie, i) =>
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
    );
  }

}

export default MoviesList;
