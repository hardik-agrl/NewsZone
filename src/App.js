import "./App.css";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import News  from "./Components/News" ;
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import { Component } from "react";

// import React, { Component } from 'react'

export default class App extends Component {
  pageSize = 12;
  apikey = process.env.REACT_APP_NEWS_API;
  // apikey = 'db2c7101a5fc4b30a2d232deca6c0e46';


  state ={
    progress:25
  }

  setProgress =  (progress) => {
    this.setState({progress:progress});
  }


  render() {
    return (
      <Router>
    
    <NavBar />
    <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
    
    <Routes>
    <Route path="/business" element={<News apikey={this.apikey} setProgress={this.setProgress} key={"business"} category={"business"} country={"in"} pageSize={this.pageSize} />}/>
    <Route path="/entertainment" element={<News apikey={this.apikey} setProgress={this.setProgress} key={"entertainment"} category={"entertainment"} country={"in"} pageSize={this.pageSize} />}/>
    <Route path="/general" element={<News apikey={this.apikey} setProgress={this.setProgress} key={"general"} category={"general"} country={"in"} pageSize={this.pageSize} />}/>
    <Route path="/health" element={<News apikey={this.apikey} setProgress={this.setProgress} key={"health"} category={"health"} country={"in"} pageSize={this.pageSize} />}/>
    <Route path="/science" element={<News apikey={this.apikey} setProgress={this.setProgress} key={"science"} category={"science"} country={"in"} pageSize={this.pageSize} />}/>
    <Route path="/sports" element={<News apikey={this.apikey} setProgress={this.setProgress} key={"sports"} category={"sports"} country={"in"} pageSize={this.pageSize} />}/>
    <Route path="/technology" element={<News apikey={this.apikey} setProgress={this.setProgress} key={"technology"} category={"technology"} country={"in"} pageSize={this.pageSize} />}/>
            
            
    <Route path="/" element={<News apikey={this.apikey} setProgress={this.setProgress} key={"general"} category={"general"} country={"in"} pageSize={this.pageSize} />}/>
    </Routes>
      
      <Footer />
      {/* <About /> */}
  
</Router>
    )
  }
}











