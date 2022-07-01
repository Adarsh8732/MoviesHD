import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'1'}}>
        <h1>MoviesHD+</h1>
        <h2 style={{marginLeft:'2rem',color:'yellow',marginTop:'2rem'}}>Fevorites</h2>
      </div>
    )
  }
}
