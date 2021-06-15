import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {NavbarView} from "../navbar-view/navbar-view";



export class GenreView extends React.Component {
  render() {
    const { genre, movies, onBackClick } = this.props;
    return (
      <div>
      <div>
      <NavbarView />
      </div>
      <div className="genre-view" style={{
                  marginTop: '70px',
                  width: '100%',
                }}>
        <div className="genre-name" style={{
                  fontSize: '22px',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '5px',
                }}>
          <span className="value">{genre.Name}</span>
        </div>
        <div className="genre-description" style={{
                  marginBottom: '5px',
                }}>
          <span className="value">{genre.Description}</span>
        </div>
        <Button variant="dark" onClick={() => { onBackClick(null) }}>Back</Button>
      </div>
      </div>
    );
  }
}