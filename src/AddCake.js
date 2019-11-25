import React, { Component } from 'react';
import config from './config';
import { Link } from 'react-router-dom';
import './Cakes.css';

class AddCake extends Component {
  state = { id: "", name: "", comment: "", imageUrl: "", yumFactor: 1 }

  componentDidMount() {
    // generate some random number 
    this.setState({id: Math.floor(Math.random() * 100) });
  }

  updateName(name) {        
    this.setState({name: name});   
  }

  updateComment(comment) {
    this.setState({comment: comment});
  }

  updateYumFactor(yumFactor) {     
    this.setState({yumFactor: yumFactor});
  }

  handleSubmit = e => {
    e.preventDefault(); 
       
    fetch(`${config.url}/cakes`, {
      method: 'POST',
      body: JSON.stringify({ ...this.state }),      
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then((data) => {
      this.props.addCake(data); 
      this.props.routeProps.history.goBack()
    })
    .catch(error => { 
      console.log(error)
    })
  }

  render() { 
    return (       
      <form onSubmit={this.handleSubmit} className="AddCakeForm"> 
        <fieldset> 
          <legend>
            <h2>Add Cake</h2>
          </legend>                 
          <label htmlFor="name">Cake Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Chocolate Cake"
            onChange={e => this.updateName(e.target.value)}
            minLength="5"
            maxLength="20"
            aria-required="true"
            className="cakeNameInput"
            required
          />             
          <label htmlFor="yummyness">Yummyness Level</label>
          <select
            name="yummyness"
            id="yummyness"
            placeholder="Select one"
            onChange={e => this.updateYumFactor(e.target.value)}
            className="cakeYummynessSelect"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">5</option>
          </select>

          <label htmlFor="commentArea">Comment</label>
          <textarea 
            name="commentArea"
            id="commentArea"
            placeholder="e.g. Best cake ever!"
            className="cakeCommentArea" 
            value={this.state.comment}
            onChange={e => this.updateComment(e.target.value)}
          />
              
          <button 
            type="submit"
            className="Buttons button_addCakeForm"
          >
            Add Cake
          </button>

          <Link to='/' className="Buttons button_goBack">Go Back</Link>
        </fieldset> 
      </form>
    );
  }
}
 
export default AddCake;