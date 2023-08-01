import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <section className='section'>
        <form autoComplete='off'>
          <input type="text" name='search' id='search' placeholder='Search for something' />
          <button>Search</button>
        </form>
        <article>
          <h1>Very big title here</h1>
          <a href="">Read Full Article</a>
        </article>

        <article>
          <div>
            <h2>Heading 2</h2>
            <ul>
              <li>By Author XY</li>
              <li><a href="">Read Full Article</a></li>
            </ul>
            <p>Date</p>
          </div>
        </article>
      </section>

      <h1>Hello World</h1>
    </>
  )
}

export default App
