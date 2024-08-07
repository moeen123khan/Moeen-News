
import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';

export class News extends Component {

  constructor(){
    super();
    this.state = {
articles : [],
loading : false,
page : 1
    }
  }

 async componentDidMount(){
let url = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=63daaa6bcffb4b30aa02821676b77805&page=1&pageSize=${pageSize}';
this.setState({loading : true});
let data = await fetch(url);
let parsedData = await data.json()
this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  }



  handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=63daaa6bcffb4b30aa02821676b77805”&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading : false});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
    })
}
//   handlePrevClick = async ()=>{
// console.log("previous");

// let url = 'https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=63daaa6bcffb4b30aa02821676b77805&page=${this.state.page - 1}&pageSize=20';
// let data = await fetch(url);
// let parsedData = await data.json()
// // this.setState({articles: parsedData.articles});
// this.setState({
//   page : this.state.page - 1,
//   articles: parsedData.articles
// })

//   }

//   handleNextClick = async ()=>{
// console.log("next");
// if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)){

// }
// else{

// let url = 'shttps://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=63daaa6bcffb4b30aa02821676b77805&page=${this.tate.page + 1}&pageSize=20';
// let data = await fetch(url);
// let parsedData = await data.json()
// // this.setState({articles: parsedData.articles});
// this.setState({
//   page : this.state.page + 1,
//   articles: parsedData.articles
// })
// }

//   }
handleNextClick = async () => {
  console.log("Next");
  if (!(this.state.page + 1 > Math.ceil(this.state.totalResults /this.props.pageSize))) {
 
      let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=63daaa6bcffb4b30aa02821676b77805&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles,
          loading: false
      })
    }
}

  render() {
    console.log("render");
    return (
      <div className='container'>
        <h1 className='text-center vh-20'>
          News Monkey - Top Headlines
        </h1>

    {this.state.loading && <Spinner/>}

      
        <div className="row">
  {this.state.loading && this.state.articles.map((element)=>{
return <div className="col-md-4" key={element.url} >
          <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
          </div>
  })}    
        </div>
        
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &#8250;</button>
        </div>

      </div>
    )
  }
}

export default News
