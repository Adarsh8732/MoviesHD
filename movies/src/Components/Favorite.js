import { movies } from "./getMovies";

import React, { Component } from "react";

export default class Favorite extends Component {
    constructor(){
        super()
        this.state={
            genre:[],
            currgen:'All Genre'
        }
    }
  render() {
    const movie = movies.results;
    // console.log(movie)
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let temp=[];
    movie.forEach((movieObj)=>{
        if(!temp.includes(genreids[movieObj.genre_ids[0]])){
            console.log(genreids[movieObj.genre_ids[0]]);
            temp.push(genreids[movieObj.genre_ids[0]]);
        }
    })
    temp.unshift("All Genre");
    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-3 favorites-genre">
              <ul class="list-group">
                {
                    temp.map((genre)=>(
                        this.state.currgen===genre?
                        <li className="list-group-item" style={{backgroundColor:"#3f51b5",color:'white',fontWeight:'bold'}}>{genre}</li>:
                        <li className="list-group-item" style={{color:"#3f51b5",backgroundColor:'white'}}>{genre}</li>

                    ))
                }
              </ul>
            </div>
            <div className="col-9 favorites-table">
              <div className="row">
                <input type="text" className="input-group-text col" placeholder="Seach"/>
                <input type="text" className="input-group-text col" placeholder="Rows Count"/>
              </div>
              <div className="row">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Popularity</th>
                      <th scope="col">Rating</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        movie.map((movieObj)=>(
                            <tr>
                            <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top" alt={movieObj.title} style={{width:'5rem',marginRight:'1rem'}} />{movieObj.original_title}</td>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td>
                            <button type="button" className="btn btn-danger">Delete</button>
                            </td>
                            </tr>
                        ))
                    }
                  </tbody>
                </table>
              </div>
              <ul class="pagination">
                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                    {
                        // this.state.parr.map((value)=>(
                        //     <li class="page-item"><a class="page-link" onClick={()=>{this.handleClick(value)}} >{value}</a></li>
                        // ))
                    }
                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
