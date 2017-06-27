import React, { Component } from 'react'
import _ from 'lodash'
import { List, Button } from 'semantic-ui-react'
import MovieForm from './MovieForm'
import DeleteModal from './DeleteModal'

class Movie extends Component {

  constructor(){
    super()
    this.state = {
      editable: false,
      modalOpen: false
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(){
    this.setState({editable: true});
  }

  handleEditSubmit(movie){
    this.setState({editable: false});
    this.props.onUpdate(movie);
  }

  handleOpen(){
    this.setState({modalOpen: true})
  }

  handleClose(){
    this.setState({modalOpen: false})
  }

  handleDelete(){
    this.props.onDelete(this.props.movie);
  }

  render(){
    if (this.state.editable){
      return(
        <div>
          <MovieForm type="edit" movie={this.props.movie} onEditSubmit={this.handleEditSubmit} allGenres={this.props.allGenres}/>
        </div>
      )
    }
    if (_.isEmpty(this.props.movie)){
      return <p>Please select a movie.</p>
    }
    return (
      <div>
        <h3>{this.props.movie.title}</h3>
        <p><strong>Storyline:</strong> {this.props.movie.storyline}</p>
        <List><strong>Genres:</strong> {this.props.movie.genres.map( (genre, i) => <List.Item key={i}>{genre}</List.Item> )}</List>
        <p><strong>Release Date:</strong> {this.props.movie.release_date}</p>
        <a href={this.props.movie.imdb_link} target="_blank" rel="noopener noreferrer"><strong>IMDB</strong></a><br/><br/>
        <Button onClick={this.handleEdit}>Edit</Button><br/>
        <DeleteModal
          trigger={<Button onClick={this.handleOpen} color="red" style={{marginTop: "10px"}}>Delete</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          title={this.props.movie.title}
          onConfirm={this.handleDelete}
        />
      </div>
    )
  };
}

export default Movie;
