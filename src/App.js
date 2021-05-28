
import './App.scss';
import React from 'react';

import Footer from './Footer.js';

let i = 0;
class App extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      api: [],
      quote: '',
      author: '',
      previousQuotes: []
    }
  }
  
  getPreviousQuote = () => {
    if(i !== 0 && this.state.previousQuotes.length !== 0) {
      i--;
      this.setState(prevState => {
       return {
         quote: prevState.previousQuotes[i].quote,
         author: prevState.previousQuotes[i].author,
         previousQuotes: prevState.previousQuotes.slice(0, i + 1)
       }
      })
    } 
  }

  getNewQuote = () => {
    const random = Math.floor(Math.random() * this.state.api.length);
    this.setState(prevState => {
      return {
        quote: prevState.api[random].text,
        author: prevState.api[random].author,
      }
    })
    this.setNewQuote()
  }

  setNewQuote = () => {
    i++;
    this.setState(prevState => {
      return {
        previousQuotes: prevState.previousQuotes.concat({
          quote: prevState.quote,
          author: prevState.author
        })
      }
    })
  }
  
  twitterPostURL = () => {
    let { quote, author } = this.state;
    return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote + '" ' + author)
  }

  tumblrPostURL = () => {
    let { quote, author } = this.state;
    return (
    'https://www.tumblr.com/widgets/share/tool?posttype=quote&caption=' 
    + encodeURIComponent(author) 
    + '&content=' 
    + encodeURIComponent('"' + quote + '""')
    + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'
    )
  }

  componentDidMount() {
    fetch('https://type.fit/api/quotes')
      .then(a => a.json())
      .then(data => {
        const random = Math.floor(Math.random() * data.length);
        this.setState(prevState => {

          return {
            api: data,
            quote: [data[random].text],
            author: [data[random].author],
            previousQuotes: prevState.previousQuotes.concat({
              quote: [data[random].text],
              author: [data[random].author]
            })
          }
        })
      })
  }

  render() {
      return (
        <div>
        <div className="App container" >
          <div className='row align-items-center'>
            <div id='quote-box' className='col'>
              <br />
              <hr style={{color: 'red'}} />            
              {(this.state.api.length === 0) ?
                  <div>
                  <h1 className='text-center'>Loading...</h1>
                  <p className='text-center'>please wait</p>
                  </div>
                  :
                  <div>
                  <q id='text' className='text-center'><strong>{this.state.quote}</strong></q>
                  <p id='author' className='text-center'><em>~ {this.state.author ? this.state.author : 'Unknown'} ~</em></p>
                  </div>
                  }
                <div className='row justify-content-center'>
                  <div className='col-2'>
                    <a 
                      href={this.twitterPostURL()} 
                      className='btn btn-primary' 
                      rel="noreferrer" 
                      id='tweet-quote' 
                      target='_blank' 
                      onClick={this.twitterPostURL}                     
                    >
                      <i className="fab fa-twitter"></i>
                    </a> 
                  </div>

                  <div className='col-2'>
                    <a 
                      href={this.tumblrPostURL()} 
                      className='btn btn-primary' 
                      rel="noreferrer" 
                      id='tumblr-quote' 
                      target='_blank'
                      onClick={this.tumblrPostURL}
                    >
                      <i className="fab fa-tumblr"></i> 
                    </a> 
                  </div>
                  <div className='col'></div>
                  <div className='col-4'>
                    <button id='previous-quote' className='btn btn-primary' onClick={this.getPreviousQuote}>Previous quote</button>
                  </div>
                  <div className='col-3'>
                    <button id='new-quote' className='btn btn-primary' onClick={this.getNewQuote}>New quote</button>
                  </div>
                  
                </div>
              <hr style={{color: 'red'}}/>
              <br />
            </div>
          </div>  
        </div>
        <Footer />
        </div>
      );
  }  
}

export default App;