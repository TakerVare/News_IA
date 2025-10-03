import { useState } from 'react'
import './App.css'
import { Buscador } from './Buscador';

function App() {
  const [news, setNews] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [valorCategoryFilter, setValorCategoryFilter] = useState('');

  
  const getNews = async(keyword, categoryFilter) => {
    const url = 'https://eventregistry.org/api/v1/article/getArticles';
    
    // Construir el body de la petición
    const bodyRequest = {
      action: "getArticles",
      sourceLocationUri: [
        "http://en.wikipedia.org/wiki/Spain"
      ],
      ignoreSourceGroupUri: "paywall/paywalled_sources",
      articlesPage: 1,
      articlesCount: 10,
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
    };

    // Agregar keyword solo si existe
    if (keyword && keyword.trim() !== '') {
      bodyRequest.keyword = keyword;
    }

    // Agregar categoryUri solo si existe
    if (categoryFilter && categoryFilter.trim() !== '') {
      bodyRequest.categoryUri = categoryFilter;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyRequest)
    });
    
    const data = await response.json();
    console.log('Respuesta de la API:', data);
    return data.articles.results;
  }

  /*
  STAR OnChanges
  */

  const onChangeKeyword = (evento) => {
    setSelectedKeyword(evento.target.value);
  }

  const onChangeCategoryFilter = (evento) => {
    setValorCategoryFilter(evento.target.value);
  }

  /*
  END OnChanges
  */

  const onSubmit = async(evento) => {
    evento.preventDefault();
    try {
      const result = await getNews(selectedKeyword, valorCategoryFilter);
      setNews(result);
    } catch (error) {
      console.error('Error al obtener noticias:', error);
    }
  }

  return (
    <div>
      <h1>Buscador de Noticias</h1>
      <Buscador 
        valorKeyword={selectedKeyword}
        onChangeKeyword={onChangeKeyword}
        onSubmit={onSubmit}
        valorCategoryFilter={valorCategoryFilter}
        onChangeCategoryFilter={onChangeCategoryFilter}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
        {news.length === 0 ? (
          <p>No hay noticias para mostrar. Realiza una búsqueda.</p>
        ) : (
          news.map(article => (
            <div className="card" key={article.uri}>
              <div className="image">
                {article.image ? (
                  <img src={article.image} alt={article.title} />
                ) : (
                  <div style={{ backgroundColor: '#ccc', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Sin imagen
                  </div>
                )}
              </div>
              <div className="content">
                <div className="header">
                  <span className="title">
                    {article.title}
                  </span>
                </div>

                <p className="desc">
                  {article.body} 
                </p>

                <div className="date">
                  <span>{new Date(article.dateTime).toLocaleDateString('es-ES')}</span>
                </div>

                {article.url && (
                  <a className="action" href={article.url} target="_blank" rel="noopener noreferrer">
                    Leer más
                    <span aria-hidden="true"> →</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App