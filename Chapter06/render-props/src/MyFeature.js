import React, { Component } from "react";

const id = (function*() {
  let i = 1;
  while (true) {
    yield i;
    i += 1;
  }
})();

export default class MyFeature extends Component {
  state = {
    articles: [
      {
        id: id.next(),
        title: "Article 1",
        summary: "Article 1 Summary",
        display: "none"
      },
      {
        id: id.next(),
        title: "Article 2",
        summary: "Article 2 Summary",
        display: "none"
      },
      {
        id: id.next(),
        title: "Article 3",
        summary: "Article 3 Summary",
        display: "none"
      },
      {
        id: id.next(),
        title: "Article 4",
        summary: "Article 4 Summary",
        display: "none"
      }
    ],
    title: "",
    summary: ""
  };

  onChangeTitle = e => {
    this.setState({ title: e.target.value });
  };

  onChangeSummary = e => {
    this.setState({ summary: e.target.value });
  };

  onClickAdd = () => {
    this.setState(state => ({
      articles: [
        ...state.articles,
        {
          id: id.next(),
          title: state.title,
          summary: state.summary,
          display: "none"
        }
      ],
      title: "",
      summary: ""
    }));
  };

  onClickRemove = id => {
    this.setState(state => ({
      ...state,
      articles: state.articles.filter(article => article.id !== id)
    }));
  };

  onClickToggle = id => {
    this.setState(state => {
      const articles = [...state.articles];
      const index = articles.findIndex(article => article.id === id);

      articles[index] = {
        ...articles[index],
        display: articles[index].display ? "" : "none"
      };

      return { ...state, articles };
    });
  };

  //The render()-props technique is an officially recognized (and popular) way to deal with dependency and subsitutition problems.  See https://reactjs.org/docs/render-props.html for more info--> The term “render-prop” refers to a technique for sharing code between React components using a prop whose value is a function.  A component with a render prop takes a function, that returns a React element, and calls it instead of implementing its own render logic.   

  // By using the render()-props technique we can more easily substitute one component for another such as if we want to use MyFeature in different parts of our application where it makes sense to use a different implementation of the ArticleList or AddArticle components.

  render() {
    const { articles, title, summary } = this.state;
    const {
      props: { addArticle, articleList },
      onClickAdd,
      onClickToggle,
      onClickRemove,
      onChangeTitle,
      onChangeSummary
    } = this;


    //NB--> the addArticle() and articleList() functions are called with the same property values that would have been passed to <AddArticle> and <ArticleList> but now MyFeature.js no longer imports AddArticle or ArticleList as dependencies.
    return (
      <section>
        {addArticle({
          title,
          summary,
          onChangeTitle,
          onChangeSummary,
          onClickAdd
        })}
        {articleList({ articles, onClickToggle, onClickRemove })}
      </section>
    );
  }
}
