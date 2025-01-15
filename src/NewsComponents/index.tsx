import React from "react";
import NewsFeed from "./NewsFeed.tsx";
import axios from "axios";
import Filters from "./FIlters.tsx";
import "./newsStyles.css";
import Loader from "./Loader.tsx";

const languages = [
  "ar",
  "de",
  "en",
  "es",
  "fr",
  "he",
  "it",
  "nl",
  "no",
  "pt",
  "ru",
  "sv",
  "ud",
  "zh",
];
const category = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];
const countries = [
  "ae",
  "ar",
  "at",
  "au",
  "be",
  "bg",
  "br",
  "ca",
  "ch",
  "cn",
  "co",
  "cu",
  "cz",
  "de",
  "eg",
  "fr",
  "gb",
  "gr",
  "hk",
  "hu",
  "id",
  "ie",
  "il",
  "in",
  "it",
  "jp",
  "kr",
  "lt",
  "lv",
  "ma",
  "mx",
  "my",
  "ng",
  "nl",
  "no",
  "nz",
  "ph",
  "pl",
  "pt",
  "ro",
  "rs",
  "ru",
  "sa",
  "se",
  "sg",
  "si",
  "sk",
  "th",
  "tr",
  "tw",
  "ua",
  "us",
  "ve",
  "za",
];
export default function NewsFeedMainComponent() {
  const [news, setNews] = React.useState([]);
  const [urlParams, setUrlParams] = React.useState({
    category: "business",
    apiKey: "f5e45be0f1a348bba560f4ae6d8fa933",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const getData = () => {
    setIsLoading(true);
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?" + new URLSearchParams(urlParams)
      )
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    getData();
  }, [urlParams]);

  const onSearch = (e: { target: { value: string } }) => {
    const value = e.target.value;
    if (value === "") {
      getData();
      return;
    }
    const newData = news.filter(
      (item: { title: string; description: string }) =>
        item.title?.toLowerCase().includes(value) ||
        item.description?.toLowerCase().includes(value)
    );
    setNews([...newData]);
  };
  const handlePersonalizationChange = (
    e: { target: { value: string } },
    type: string
  ) => {
    console.log(e.target.value, type);
    const obj = {};
    obj[type] = e.target.value;
    setUrlParams({ ...urlParams, ...obj });
  };

  return (
    <>
      {isLoading && <Loader />}
      {/* <Filters /> */}
      <input
        placeholder="search"
        className="search-input"
        onChange={onSearch}
      />
      <div className="personalize-container">
        <label for="category-select">Personalize with:</label>
        <select
          id="category-select"
          className="personalize-select"
          onChange={(e: { target: { value: string } }) =>
            handlePersonalizationChange(e, "category")
          }
        >
          <option value="" disabled selected>
            Select category
          </option>
          {category.map((item) => {
            return <option key={item}>{item}</option>;
          })}
        </select>
        <select
          id="language-select"
          className="personalize-select"
          onChange={(e: { target: { value: string } }) =>
            handlePersonalizationChange(e, "language")
          }
        >
          <option value="" disabled selected>
            Select language
          </option>
          {languages.map((item) => {
            return <option key={item}>{item}</option>;
          })}
        </select>
        <select
          id="country-select"
          className="personalize-select"
          onChange={(e: { target: { value: string } }) =>
            handlePersonalizationChange(e, "country")
          }
        >
          <option value="" disabled selected>
            Select country
          </option>
          {countries.map((item) => {
            return <option key={item}>{item}</option>;
          })}
        </select>
        <input
          type="date"
          className="date-input"
          onChange={(e: { target: { value: string } }) =>
            handlePersonalizationChange(e, "publishedAt")
          }
        />
      </div>

      {news.length > 0 ? (
        <NewsFeed newsData={news} />
      ) : (
        <p>No News for the selected customization</p>
      )}
    </>
  );
}
