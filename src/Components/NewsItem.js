import React, { Component } from "react";

export default class NewsItem extends Component {
  render() {
    return (
      <div className="container">
        <div className="card">
          <img src={this.props.urlToImage} className="card-img-top" alt="..." />
          <div className="card-body">
            <span class="position-absolute top-0  d-flex justify-content-end translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:"1"}}>
              {this.props.source}
              {/* <span class="visually-hidden">unread messages</span> */}
            </span>
            <h5 className="card-title">{this.props.title}...</h5>
            <p className="card-text">{this.props.disc}...</p>
            <a href={this.props.url} className="btn btn-dark">
              Read more
            </a>
            <p className="card-text">
              <small className="text-body-secondary">{`by ${
                this.props.author
              } on ${new Date(this.props.date).toGMTString()}`}</small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
