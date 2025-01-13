import React from "react";
import NewsFeed from "./NewsFeed";
import Filters from "./Filters";
import axios from "axios";

export default function NewsFeedMainCompoenet() {
  const [news, setNews] = React.useState([]);
  const getData = () => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?country=us&apiKey=f5e45be0f1a348bba560f4ae6d8fa933"
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Filters />
      <NewsFeed />
    </>
  );
}
