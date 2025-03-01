import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function getArticles(category = '') {
    try {
        const token = await getToken();
        const url = category 
            ? `${BACKEND_URL}/author-api/articles/filter/${category}` 
            : `${BACKEND_URL}/author-api/articles`;

        // console.log("Fetching articles from:", url); 

        const res = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // console.log("Response received:", res.data); 

        if (res.data.message === 'articles') {
            setArticles(res.data.payload || []); 
            setError(res.data.payload.length === 0 ? 'No articles found.' : '');
        } else {
            setError('Unexpected response format.');
        }
    } catch (err) {
        // console.error("Fetch error:", err);
        setError('Failed to fetch articles');
    }
}


  function gotoArticleById(articleObj) {
    navigate(`../${articleObj.articleId}`, { state: articleObj });
  }

  useEffect(() => {
    getArticles();
  }, []);

  function handleCategoryChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);
    getArticles(category);
  }

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <div className='category-select-container' style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          marginBottom: '2rem'
        }}>
          <label className='form-label mb-2' style={{
            color: 'var(--accent-primary)',
            fontSize: '1.1rem',
            fontFamily: 'JetBrains Mono, monospace'
          }}>Filter by Category</label>
          <select 
            className='form-select custom-select' 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            style={{
              backgroundColor: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <option value=''>All Categories</option>
            <option value='programming'>Programming</option>
            <option value='AI&M'>AI & Machine Learning</option>
            <option value='database'>Database</option>
          </select>
        </div>

        {error && (
          <div className='error-message' style={{
            backgroundColor: 'rgba(255, 128, 171, 0.1)',
            border: '1px solid var(--accent-primary)',
            color: 'var(--accent-primary)',
            padding: '1rem',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            {error}
          </div>
        )}

        <div className='row g-4'>
          {articles.map((articleObj) => (
            <div className='col-12 col-md-6 col-lg-4' key={articleObj.articleId}>
              <div className='article-card' style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0, 255, 127, 0.15)'
                }
              }} onClick={() => gotoArticleById(articleObj)}>
                <div className='article-header' style={{
                  padding: '1.5rem',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <img 
                    src={articleObj.authorData.profileImageUrl} 
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      border: '2px solid var(--accent-primary)'
                    }} 
                    alt='' 
                  />
                  <div>
                    <h6 style={{
                      color: 'var(--accent-primary)',
                      margin: '0',
                      fontSize: '0.9rem',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>{articleObj.authorData.nameOfAuthor}</h6>
                    <small style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.8rem'
                    }}>
                      {new Date(articleObj.dateOfModification).toLocaleDateString()}
                    </small>
                  </div>
                </div>

                <div className='article-content' style={{
                  padding: '1.5rem',
                  flex: 1
                }}>
                  <h5 style={{
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
                    fontSize: '1.2rem',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}>{articleObj.title}</h5>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                  }}>{articleObj.content.substring(0, 120)}...</p>
                  
                  <div className='article-footer' style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto'
                  }}>
                    <span className='category-tag' style={{
                      backgroundColor: 'rgba(0, 255, 127, 0.1)',
                      color: 'var(--accent-primary)',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>{articleObj.category || 'Uncategorized'}</span>
                    
                    <button className='read-more-btn' style={{
                      backgroundColor: 'transparent',
                      border: '1px solid var(--accent-primary)',
                      color: 'var(--accent-primary)',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: 'JetBrains Mono, monospace',
                      '&:hover': {
                        backgroundColor: 'var(--accent-primary)',
                        color: 'var(--bg-primary)'
                      }
                    }}>Read More →</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;
