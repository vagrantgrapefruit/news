import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
  title: 'React',
  url: 'https://facebook.github.io/react/',
  author: 'Jordan Walke',
  num_comments: 3,
  points: 4,
  objectID: 0,
  },
  {
  title: 'Redux',
  url: 'https://github.com/reactjs/redux',
  author: 'Dan Abramov, Andrew Clark',
  num_comments: 2,
  points: 5,
  objectID: 1,
  },
];



//搜索函数，判断输入款和列表中的内容是否一致
const isSearched = searchTerm => item =>
item.author.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    list,
    searchTerm: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  //隐藏列表中的一项
  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  //获取输入框中的内容并存到变量中
  onSearchChange(event){
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const {searchTerm,list}=this.state;
    return (
      <div className="page"> 
        <div className="interactions">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange} >
          Search
        </Search>
        </div>
        <Table 
        list={list}
        pattern = {searchTerm}
        onDismiss={this.onDismiss}/>
        
      
      </div>
    );
  }
}

const Search=({ value, onChange, children }) =>
    <form>
      {children} <input
        type="text"
        value={value}
        onChange={onChange}
    />
    </form>
  

const Table=({list,pattern,onDismiss}) =>
    <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
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
