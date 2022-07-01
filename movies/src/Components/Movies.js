// import { movies } from "./getMovies";

import React, { Component } from 'react'
import axios from 'axios';
export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
        }
    }
    //f4555560038c11354538dda52d874a6a
    enterhover=(movieObj)=>{
        // console.log("enterd"+" "+movieObj.id);
        this.setState({
            hover:movieObj.id
        })
    }
    exitHover = ()=>{
        // console.log();
        this.setState({
            hover:''
        })
    }
    async componentDidMount(){
        // console.log("mount done");
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f4555560038c11354538dda52d874a6a&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        console.log(data);
        this.setState({
            movies:[...data.results],  
        })
    }
    changeMovies = async()=>{
        // console.log(this.state.currPage);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f4555560038c11354538dda52d874a6a&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results],  
        })
    }
    handleRight = ()=>{
        let temparr = [];
        for(let i=1;i<=this.state.parr.length+1;i++){
            temparr.push(i);
        }
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovies)
    }
    handleLeft=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
    }
    handleClick=(value)=>{
        // console.log(value);
        if(value!=this.state.currPage)
            this.setState({
                currPage:value
            },this.changeMovies)
    }
  render() {
    // let movie = movies.results;
    return (
        <>
        {
            this.state.movies.length===0?<div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>:
          <div>
            <h3 className="text-center"><strong>Trending</strong></h3>
            <div className="movies-list">
                {
                    this.state.movies.map((movieObj)=>(
                        <div className="card movies-card" onMouseEnter={()=>this.enterhover(movieObj)} onMouseLeave={()=>this.exitHover()}>
                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movies-img" alt={movieObj.title} />
                        {/* <div className="card-body"> */}
                        <h2 className="card-title movies-title">{movieObj.original_title}</h2>
                        <div className="button-wrapper">
                            {
                                this.state.hover===movieObj.id && <a className="btn btn-primary movies-button">
                                    Add to Favorites
                                    </a>
                            }
                        {/* </div> */}
                        </div>
                    </div>
                    ))
                }
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
                <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                    {
                        this.state.parr.map((value)=>(
                            <li class="page-item"><a class="page-link" onClick={()=>{this.handleClick(value)}} >{value}</a></li>
                        ))
                    }
                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                </ul>
                </nav>
            </div>
          </div>
        }
        </>
    )
  }
}
