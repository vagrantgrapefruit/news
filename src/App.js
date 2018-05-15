import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'react';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';





//搜索函数，判断输入款和列表中的内容是否一致
const isSearched = searchTerm => item =>
item.title.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error:null,
    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this); 
    this.onSearchSubmit=this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }
  fetchSearchTopStories(searchTerm,page=0) {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => this.setState({ error: e }));
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  //隐藏列表中的一项
  onDismiss(id){
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  //获取输入框中的内容并存到变量中
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
    } = this.state;
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];
    return (
      <div className="page"> 
        <div className="interactions">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange} 
          onSubmit={this.onSearchSubmit}
        >
          Search
        </Search>
        </div>
        { error
          ? <div className="interactions">
            <p>Something went wrong.</p>
            </div>
            : <Table
                list={list}
                onDismiss={this.onDismiss}
              />
        }
        <div className="interactions">
        <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
        More
        </Button>
        </div>
      
      </div>
    );
  }
}

const Search=({ value, onChange,onSubmit, children }) =>
    <form  onSubmit={onSubmit}>
    <input
        type="text"
        value={value}
        onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
    </form>
/* function Search({ value, onChange, children }) {
    return(
      <form>
        {children} <input
          type="text"
          value={value}
          onChange={onChange}
      />
      </form>
    );
} */

/* class Search extends Component{
  render(){
    const{value, onChange, children}=this.props;
    return(
      <form>
      {children} <input
        type="text"
        value={value}
        onChange={onChange}
      />
      </form>
    );
  }
} */

const Table=({list,pattern,onDismiss}) =>
    <div className="table">
    {list.map(item =>
    <div key={item.objectID} className="table-row">
      <span>
      <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <Button
          onClick={() => onDismiss(item.objectID)}    
          className="button-inline"        
        >
          Dismiss
        </Button>
      </span>
    </div>
    )}
    </div>


const Button = ({onClick,  className='',  children})=>

    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>




export default App;

export{Search,
      Table,
      Button,      
};
