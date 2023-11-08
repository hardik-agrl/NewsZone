import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    // let {pageSize} =  this.props;
    articles= []
        


    constructor(props){
        super(props);
        this.state={
            article : this.articles,
            loading :true,
            page:1,
            totalResults:0
        }
        document.title = (this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1)

        
    }

    async updateNews(){
        // this.props.setProgress(0);
        const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apikey}&page=${this.state.page}&category=${this.props.category}&pageSize=${this.prop.pageSize}`;
            this.setState({loading:true})
            // this.props.setProgress(25);
            let data = await fetch(url);
            let parseData = await data.json();
            // this.props.setProgress(75);
            this.setState({
                article: parseData.articles,
                totalResults:parseData.totalResults,
                loading:false,
            })
            // this.props.setProgress(100);
            // console.log(parseData);
    }

    async componentDidMount(){
        this.setState({loading:true})
        this.props.setProgress(0);
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apikey}&page=1&category=${this.props.category}&pageSize=${this.props.pageSize}`;
        this.props.setProgress(25);
        let data = await fetch(url);
        this.props.setProgress(45);
        let parseData = await data.json();
        this.props.setProgress(85);
        this.setState({loading:false})
        console.log(parseData);
        this.setState(
            {article : parseData.articles,
            totalResults:parseData.totalResults},
            
        )
        this.props.setProgress(100);

        
            
        
    }
    handlenext= async ()=>{
        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            this.setState({loading:true})
            let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apikey}&page=${this.state.page+1}&category=${this.props.category}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({loading:false})
            console.log(parseData);
            this.setState(
                {
                    article : parseData.articles,
                    page:this.state.page+1}
                    )
                    
                }
            // this.updateNews(page);    
    }
    
    handleprev =async ()=>{
        console.log("prev")
        this.setState({loading:true})
        let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apikey}&page=${this.state.page-1}&category=${this.props.category}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({loading:false})

        console.log(parseData);
        this.setState(
            {
                article : parseData.articles,
                page:this.state.page-1
            },
            
        )
        // this.updateNews(page);
        
    }

    fetchMoreData = async() => {
        this.setState({page:this.state.page+1})
        const url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&apiKey=${this.props.apikey}&page=${this.state.page}&category=${this.props.category}&pageSize=${this.props.pageSize}`;
            // this.setState({loading:true})
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                article: this.state.article.concat(parseData.articles),
                totalResults:parseData.totalResults,
                loading:false,
            })
        
      };
    

  render() {
    return (
        // Document.title= Hello-Monkey,
      <div className='container my-5'>
       <h1 className='text-center'>{`Top ${(this.props.category).charAt(0).toUpperCase() + (this.props.category).slice(1)} Headlines `}  </h1>
       {this.state.loading && <Spinner/>}


        <InfiniteScroll
            dataLength={this.state.article.length}
            next={this.fetchMoreData}
            hasMore={this.state.article.length !== this.state.totalResults}
            loader={<Spinner/>}
            // scrollableTarget="scrollableDiv"
          >


                <div className=" row" >
                {!this.state.loading && this.state.article.map((article)=>{
                    return <div className="my-3  col-lg-4 " key={article.url}>
                     <NewsItem title={article.title?article.title.slice(0,65):""} disc={article.description?article.description.slice(0,88):""} urlToImage={article.urlToImage?article.urlToImage:"https://t3.ftcdn.net/jpg/03/27/55/60/360_F_327556002_99c7QmZmwocLwF7ywQ68ChZaBry1DbtD.jpg"} url={article.url} author={article.author} source={article.source.name} date={article.publishedAt}/>
                    </div>
                })}
                </div>
         </InfiniteScroll>     
            
        {/* <div className='d-flex justify-content-between '>
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev}>&larr; prev</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenext}>next &rarr;</button>

        </div> */}
        
        {/* <NewsItem/>
        <NewsItem/>
        <NewsItem/>
        <NewsItem/>
        <NewsItem/> */}
      </div>
    )
  }
}
