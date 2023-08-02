import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('programming');
  const [text, setText] = useState('');
  const [largeTitle, setLargeTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const fetchArticles = async () => {
      try {
        const res = await fetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setItems(data.hits);
        setLargeTitle(data.hits[0]);
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching data from the API. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      toast('Input is empty');
    } else {
      setQuery(text);
      setText('');
      setCurrentPage(1); // Reset current page on new search
    }
  };

  const itemsPerPage = 6; // Adjust this as needed
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = items.slice(startIndex, endIndex);

  return (
    <>
      <section className="section">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <input
            value={text}
            type="text"
            name="search"
            id="search"
            onChange={(e) => setText(e.target.value)}
            placeholder="Search for something"
          />
          <button>Search</button>
        </form>

        <div id="error-message" className="error-message">
          {error && <p>{error}</p>}
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <article className="title">
              <h1>{largeTitle.title}</h1>
              <a href={largeTitle.url} target="_blank" rel="noreferrer">
                Read Full Article
              </a>
            </article>

            <p className="category">Category: <span>{query}</span></p>

            {/* Cards */}
            <div className="cards">
              {itemsToDisplay.map(({ author, created_at, title, url, objectId }) => (
                <div key={objectId} className="card">
                  <h2>{title}</h2>
                  <ul>
                    <li>By {author}</li>
                    <li>
                      <a href={url} target="_blank" rel="noreferrer">
                        Read Full Article
                      </a>
                    </li>
                  </ul>
                  <p>{format(new Date(created_at), 'dd MMMM yyyy')}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                id="prevBtn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <button
                id="nextBtn"
                disabled={endIndex >= items.length}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default App;