import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',padding:'1'}}>
        <Link to ="/" style={{textDecoration:"none"}}><h1 style={{marginTop:"1rem",marginLeft:"2rem"}}>MoviesHD+</h1></Link>
        <Link to="/favorites" style={{textDecoration:"none"}}><h2 style={{marginLeft:'2rem',color:'yellow',marginTop:'2rem'}}>Fevorites</h2></Link>
      </div>
    )
  }
}
