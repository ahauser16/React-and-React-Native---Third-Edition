import React, { Component } from "react";

const id = (function* () {
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
        display: "none",
      },
      {
        id: id.next(),
        title: "Article 2",
        summary: "Article 2 Summary",
        display: "none",
      },
      {
        id: id.next(),
        title: "Article 3",
        summary: "Article 3 Summary",
        display: "none",
      },
      {
        id: id.next(),
        title: "Article 4",
        summary: "Article 4 Summary",
        display: "none",
      },
    ],
    title: "",
    summary: "",
  };

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  onChangeSummary = (e) => {
    this.setState({ summary: e.target.value });
  };

  onClickAdd = () => {
    this.setState((state) => ({
      articles: [
        ...state.articles,
        {
          id: id.next(),
          title: state.title,
          summary: state.summary,
          display: "none",
        },
      ],
      title: "",
      summary: "",
    }));
  };

  onClickRemove = (id) => {
    this.setState((state) => ({
      ...state,
      articles: state.articles.filter((article) => article.id !== id),
    }));
  };

  //the onClickToggle() method toggles the visibility of the article with the given ID.
  onClickToggle = (id) => {
    this.setState((state) => {
      //There are two immutable operations within this method.
      //First, we declare a new state array named articles using the spread operator which is based on the existing articles state array.
      const articles = [...state.articles];
      //Second, based on the index of the given article's ID...
      const index = articles.findIndex((article) => article.id === id);

      //... we replace the articles object at the index with a new object which contains the same properties thanks to the spread operator...
      articles[index] = {
        ...articles[index],
        //...and then the display property value is toggled based on the existing display value.
        display: articles[index].display ? "" : "none",
      };

      return { ...state, articles };
    });
  };

  render() {
    const { articles, title, summary } = this.state;

    return (
      <section>
        {/* 
        Within this JSX block, the header contains the feature's form controls so this could become its own component.
        */}
        <header>
          <h1>Articles</h1>
          <input
            placeholder="Title"
            value={title}
            onChange={this.onChangeTitle}
          />
          <input
            placeholder="Summary"
            value={summary}
            onChange={this.onChangeSummary}
          />
          <button onClick={this.onClickAdd}>Add</button>
        </header>

        <article>
          <ul>
            {/* 
            Within this article tag and unordered list, there's potential for an article component which would be everything in the <li> tag 
            */}
            {articles.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  title="Toggle Summary"
                  onClick={this.onClickToggle.bind(null, i.id)}
                >
                  {i.title}
                </a>
                &nbsp;
                <a
                  href={`#${i.id}`}
                  title="Remove"
                  onClick={this.onClickRemove.bind(null, i.id)}
                >
                  &#10007;
                </a>
                <p style={{ display: i.display }}>{i.summary}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    );
  }
}
