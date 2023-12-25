import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = '22cee7aa7e034ce6aa08cae6617d2c70';
const url = 'https://newsapi.org/v2/everything?q=';

const topics = ['Sports', 'Finance', 'Politics', 'Technology'];

const HomePage = ({ setArticles }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [articles, setArticlesState] = useState([]);
  const [showMiniBrowser, setShowMiniBrowser] = useState(false);
  const [selectedArticleUrl, setSelectedArticleUrl] = useState('');

  useEffect(() => {
    fetchNews(searchText || 'India');
  }, [searchText]);

  async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    setArticlesState(data.articles);
  }

  function onTopicClick(topic) {
    fetchNews(topic);
    setSelectedTopic(topic);
  }

  function onSearchButtonClick() {
    fetchNews(searchText || 'India');
    setSelectedTopic(null);
  }

  function onArticleClick(articleUrl) {
    setSelectedArticleUrl(articleUrl);
    setShowMiniBrowser(true);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <b>News Aggregator</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {topics.map((topic) => (
                <li className="nav-item" key={topic}>
                  <a
                    className={`nav-link ${selectedTopic === topic ? 'active' : ''}`}
                    onClick={() => onTopicClick(topic)}
                    href="#"
                  >
                    {topic}
                  </a>
                </li>
              ))}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={onSearchButtonClick}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <h1 className="text-center mb-3">Headlines</h1>
        <div className="row justify-content-center">
          {articles.map((ele, index) => (
            <div
              key={index}
              className="card col-10 col-md-5 col-lg-3 m-2"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.boxShadow = "1px 1px 8px #d4ecff")}
              onMouseLeave={(e) => (e.target.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px")}
            >
              <img
                src={
                  ele.urlToImage == null
                    ? "https://www.exchange4media.com/news-photo/100947-expresslogo.jpg?crop=0.383xw:0.383xh;0.517xw,0.252xh&resize=1200:*"
                    : ele.urlToImage
                }
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  {ele.title === "" ? "Janelle Ash" : ele.title}
                </h5>
                <p className="card-text">{ele.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => onArticleClick(ele.url)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
        {showMiniBrowser && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}
          >
            <button onClick={() => setShowMiniBrowser(false)}>
              Close Browser
            </button>
            <iframe
              src={selectedArticleUrl}
              title="Mini Browser"
              style={{ width: '500px', height: '500px', border: '5px' }}
              allow="fullscreen"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
