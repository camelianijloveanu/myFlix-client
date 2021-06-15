import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import {NavbarView} from "../navbar-view/navbar-view";


export class DirectorView extends React.Component {
  render() {
    const { director, movies, onBackClick } = this.props;
    return (
      <div>
        <div>
      <NavbarView />
      </div>
      <div className="director-view" style={{
                  marginTop: '70px',
                  width: '100%',
                }}>
        <div className="director-name" style={{
                  fontSize: '25px',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '5px',
                }}>
          <span className="value">{director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="value">{director.Bio}</span>
        </div>
        <div className="director-birth" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '5px',
                }}>
          <span className="label">Birth: </span>
          <span className="value">{director.Birth}</span>
        </div>
        <div className="director-death" style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '5px',
                }}>
          <span className="label">Death: </span>
          <span className="value">{director.Death}</span>
        </div>
        <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '25px',
                }}>
        <Button variant="dark" onClick={() => { onBackClick(null) }}>Back</Button>
        </div>
      </div>
      </div>
    );
  }
}