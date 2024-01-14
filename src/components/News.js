import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Loading from "./Loading";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async (page = 1) => {
    this.setState({ loading: true });

    let url = `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=c856f27199174bcc826f73c295020b99&page=${page}&pageSize=5`;

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      loading: false,
      page,
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  };

  nextbtn = async () => {
    const nextPage = this.state.page + 1;
    await this.fetchData(nextPage);
  };

  prevbtn = async () => {
    if (this.state.page > 1) {
      const prevPage = this.state.page - 1;
      await this.fetchData(prevPage);
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h2>Top Headlines</h2>
        {this.state.loading && <Loading />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    url={element.url}
                    imageUrl={element.urlToImage}
                  />
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            onClick={this.prevbtn}
            className="btn btn-outline-primary"
            disabled={this.state.page <= 1}
          >
            &larr; Prev
          </button>
          <button
            type="button"
            onClick={this.nextbtn}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / 5)
            }
            className="btn btn-outline-primary"
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
