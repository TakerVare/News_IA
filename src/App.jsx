import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Buscador } from './Buscador';

function App() {
  const [news, setCount] = useState([]); // Cambiar nombre del estado
  const [selectedKeyword, setSelectedKeyword] = useState(''); // Corregido nombre y valor inicial
  const [valorCategoryFilter, setValorCategoryFilter] = useState('');

  
  const getNews = async() => {
    const url = 'https://eventregistry.org/api/v1/article/getArticles';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: "getArticles",
        keyword: selectedKeyword, // Aquí usamos el estado selectedKeyword
        sourceLocationUri: [
          "http://en.wikipedia.org/wiki/Spain"
        ],
        ignoreSourceGroupUri: "paywall/paywalled_sources",
        articlesPage: 1,
        articlesCount: 3,
        articlesSortBy: "date",
        articlesSortByAsc: false,
        dataType: [
          "news"
        ],
        keywordOper: "and",
        lang: [
          "spa"
        ],
        forceMaxDataTimeWindow: 31,
        resultType: "articles",
        apiKey: "8b97f66b-5f69-4669-8734-19860f9e5232"
      })
    });
    const data = await response.json();
    //console.log(data);
    return data.articles.results;

  }

  /*
  STAR OnChanges
  */

  const onChangeKeyword = (evento) => {
    setSelectedKeyword(evento.target.value); // Corregido el nombre del setter
  }

  const onChangeCategoryFilter = (evento) => {
    setValorCategoryFilter(evento.target.value);
  }

  /*
  END OnChanges
  */

  const onSubmit = async(evento) => {
    evento.preventDefault();
    const result = await getNews();
    setCount(result); // Actualizar el estado con las noticias
  }

  return (
    <div>
      <Buscador 
        valorKeyword={selectedKeyword}
        onChangeKeyword={onChangeKeyword}
        onSubmit={onSubmit}
        selectedFilter={valorCategoryFilter}
        onChangeFilter={onChangeCategoryFilter}
      />
      {
        news.map(article => ( // Cambiar 'new' por 'article'
          <div  className="card" key={article.uri}>
            <div className="image">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="content">
              <a href="#">
                <span className="title">
                  {article.title}
                </span>
              </a>

              <p className="desc">
                {article.body} 
              </p>

              <a className="action" href="#">
                Find out more
                <span aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default App
