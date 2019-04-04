import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      word: '',
      list: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state.word)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`https://api.urbandictionary.com/v0/define?term={${this.state.word}}`)
    .then((list)=>{
      return list.json()
    }).then(({list})=>{
      console.log(list)
      this.setState({list})
    })
  }

  render() {
    const values = this.state.list.map((value)=>{
      return <Card className='box'>
        <CardContent>
            <Typography className='text' component="h2">
              {value.definition}
            </Typography>
        </CardContent>
      </Card>
    })
    return (
      <div>
        <h1> Urban Dictionary Clone </h1>
        <form onSubmit={this.handleSubmit}>
              <TextField onChange={this.handleChange} type='text' value={this.state.word} name="word"  />
              <Button size="large" variant="outlined" color='primary' type='submit'> submit </Button>
         </form>
          <div className="values">
             {values}
          </div>

      </div>
    );
  }

}

export default App;
