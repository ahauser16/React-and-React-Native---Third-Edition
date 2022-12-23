import React from "react";
import { render } from "react-dom";
import ArticleList from "./ArticleList";
import AddArticle from "./AddArticle";
import MyFeature from "./MyFeature";

render(
  <MyFeature
    //We've refactored this code so that now this is where the addArticle and articleList render-props are passed to the MyFeature component.  These prop values are functions that accept argument values from MyFeature.
    addArticle={({
      title,
      summary,
      onChangeTitle,
      onChangeSummary,
      onClickAdd,
    }) => (
      <AddArticle
        name="Articles"
        title={title}
        summary={summary}
        onChangeTitle={onChangeTitle}
        onChangeSummary={onChangeSummary}
        onClickAdd={onClickAdd}
      />
    )}
    //For example, even though the onClickToggle() function is declared in (and used to change the state of) the MyFeature component we can still use the render prop function to pass the onClickToggle() function (and any other values) to the component that will be rendered which in this case is ArticleList.  Ultimately, the return values from the addArticle and articleList functions are what's rendered.
    articleList={({ articles, onClickToggle, onClickRemove }) => (
      <ArticleList
        articles={articles}
        onClickToggle={onClickToggle}
        onClickRemove={onClickRemove}
      />
    )}
  />,
  document.getElementById("root")
);
