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


const helloWorld = 'Welcom';

//搜索函数，判断输入款和列表中的内容是否一致
const isSearched = searchTerm => item =>
item.author.toLowerCase().includes(searchTerm.toLowerCase());


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    list,
    searchTerm: '',
    helloWorld: helloWorld,
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
    const {searchTerm,list,helloWorld}=this.state;
    return (
      <div className="App">
      {/* <form>
        <input type="text"
        value={searchTerm}
        onChange={this.onSearchChange} />        
      </form>

      {list.filter(isSearched(searchTerm)).map((item) => <div>
        <span>
        <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>     
        <span>
          <button
            onClick={() => this.onDismiss(item.objectID)}
            //onClick={()=>console.log(item.objectID)}
            type="button"
            >
            Dismiss
          </button>
        </span> 
        </div> */}  
        <Search
          value={searchTerm}
          onChange={this.onSearchChange} >
          Search
        </Search>
        <Table 
        list={list}
        pattern = {searchTerm}
        onDismiss={this.onDismiss}/>
        
      
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange,children} = this.props;
    return (
      <form>
        {children} <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
      {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID}>
        <span>
        <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
        <span>
          <button
            onClick={() => onDismiss(item.objectID)}
            type="button"
          >
            Dismiss
          </button>
        </span>
      </div>
      )}
      </div>
    );
  }
}

export default App;
