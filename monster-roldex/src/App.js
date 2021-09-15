import React, {Component} from 'react';
import './App.css';
import {CardList} from './component/card-list/card-list.component'
import { SearchBox } from './component/search-box/search-box.component'
class App extends Component {
  constructor(){
    super();

    this.state={
      monster: [],
      searchField : ''
    }

  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=> res.json())
    .then(user => this.setState({monster:user}))
  }

  render(){
    const {monster , searchField} = this.state;
    const filteredMonsters = monster.filter(monsters => monsters.name.toLowerCase().includes(searchField.toLowerCase()))
  return (
    <div className="App">
      <h1>Monster Rolodex</h1>
      <SearchBox 
        placeholder = 'Search Monster'
        handleChange = {e=>this.setState({searchField:e.target.value})}
      />
      <CardList monster ={filteredMonsters} />
    </div>
  );
}
}

export default App;
