import { movies } from "./getMovies";

import React, { Component } from "react";

export default class Favorite extends Component {
    constructor(){
        super()
        this.state={
            genre:[],
            currgen:'All Genre',
            Movies:[],
            currText:"",
            limit:5,
            currPage :1
        }
    }
  componentDidMount(){
    let data = JSON.parse(localStorage.getItem("movies") || "[]")
    console.log(data);
    let temp=[];
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    data.forEach((movieObj)=>{
        if(!temp.includes(genreids[movieObj.genre_ids[0]])){
            // console.log(genreids[movieObj.genre_ids[0]]);
            temp.push(genreids[movieObj.genre_ids[0]]);
        }
    })
    temp.unshift("All Genre");
    this.setState({
      Movies:[...data],
      genre:[...temp]
    })
  }
  changeGenre = (genre)=>{
    this.setState({
      currgen : genre
    })
  }


  sortByPopularity =(val)=>{
    let temp = this.state.Movies;
    temp.sort(function(a,b){
      return (a.popularity-b.popularity)*val;
    })
    this.setState({
      Movies:[...temp]
    })
  }
  sortByRating =(val)=>{
    let temp = this.state.Movies;
    temp.sort(function(a,b){
      return (a.vote_average-b.vote_average)*val;
    })
    this.setState({
      Movies:[...temp]
    })
  }
  handleDelete = (movieObj)=>{
    let data = JSON.parse(localStorage.getItem('movies') || "[]");
    data = data.filter((m)=>{
      return m.id!=movieObj.id;
    })
    localStorage.setItem('movies',JSON.stringify(data));
    this.setState({
      Movies:[...data]
    })
  }
  handlePages = (page)=>{
    this.setState({
      currPage:page
    })
  }
  render() {
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
    27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let filteredArr = [];
    
    
    if(this.state.currText==''){
      filteredArr=this.state.Movies;
    }else{
      filteredArr = this.state.Movies.filter((movieObj)=>{
        let title = movieObj.original_title.toLowerCase();
        return title.indexOf(this.state.currText.toLowerCase())!=-1;
      })
    }
    // console.log(filteredArr.length)
    if(this.state.currgen!=='All Genre'){
      filteredArr = filteredArr.filter((movieObj)=>{return genreids[movieObj.genre_ids[0]]==this.state.currgen})

    }

    let pages = Math.ceil(this.state.Movies.length/((this.state.limit==0)?1:this.state.limit))
    let pagesarr = [];
    for(let i=1;i<=pages;i++){
      pagesarr.push(i);
    }
    let si = (this.state.currPage-1)*this.state.limit;
    let ei = si+this.state.limit;
    filteredArr = filteredArr.slice(si,ei);
    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-lg-3 favorites-genre col-sm-12">
              <ul class="list-group">
                {
                    this.state.genre.map((genre)=>(
                        this.state.currgen===genre?
                        <li className="list-group-item" style={{backgroundColor:"#3f51b5",color:'white',fontWeight:'bold'}}>{genre}</li>:
                        <li className="list-group-item" style={{color:"#3f51b5",backgroundColor:'white'}} onClick={()=>{this.changeGenre(genre)}}>{genre}</li>

                    ))
                }
              </ul>
            </div>
            <div className="col-lg-9 favorites-table col-sm-12">
              <div className="row">
                <input type="text" className="input-group-text col" placeholder="Seach" value={this.state.currText} onChange={(e)=>{this.setState({currText:e.target.value})}}/>
                <input type="Number" className="input-group-text col" placeholder="Rows Count" value ={this.state.limit} onChange={(e)=>{this.setState({limit:e.target.value})}}/>
              </div>
              <div className="row">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col"><i class="fa-solid fa-sort-up" onClick={()=>this.sortByPopularity(1)}></i>Popularity<i class="fa-solid fa-sort-down" onClick={()=>this.sortByPopularity(-1)}></i></th>
                      <th scope="col"><i class="fa-solid fa-sort-up" onClick={()=>{this.sortByRating(1)}}></i>Rating<i class="fa-solid fa-sort-down" onClick={()=>{this.sortByRating(-1)}}></i></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        filteredArr.map((movieObj)=>(
                            <tr>
                            <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top" alt={movieObj.title} style={{width:'5rem',marginRight:'1rem'}} />{movieObj.original_title}</td>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td>
                            <button type="button" className="btn btn-danger" onClick={()=>{this.handleDelete(movieObj)}}>Delete</button>
                            </td>
                            </tr>
                        ))
                    }
                  </tbody>
                </table>
              </div>
              <ul class="pagination">
                    {
                        pagesarr.map((page)=>(
                            <li class="page-item"><a class="page-link" onClick={()=>{this.handlePages(page)}} >{page}</a></li>
                        ))
                    }
                </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
