import React, { Component } from 'react';
import config from './config';
import { Link } from 'react-router-dom';

class EditCake extends Component {
  state = { id: "", name: "", comment: "", imageUrl: "", yumFactor: 1 }

  componentDidMount() {
    let { id } = this.props.routeProps.match.params

    fetch(`${config.url}/cakes/${id}`,  
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )        
    .then(resCakes => {
        if (!resCakes.ok) {
          return resCakes.json().then(err => Promise.reject(err))
        }
        return resCakes.json()
    })
    .then(cake => {
      this.setState({  
        id: cake.id,
        name: cake.name,
        comment: cake.comment,
        yumFactor: cake.yumFactor
      });
    })
    .catch(err => console.log(err))
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

  handleEditCake = (e) => {
    e.preventDefault(); 
    const { id } = this.state
       
    fetch(`${config.url}/cakes/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({ ...this.state }),      
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then((data) => {
      this.props.editCake(data); 
      this.props.routeProps.history.push('/')
    })
    .catch(error => { console.log(error) })
  }

  render() { 
    const { name, comment, yumFactor } = this.state

    return ( 
      <form onSubmit={this.handleEditCake} className="AddCakeForm"> 
        <fieldset> 
          <legend>
            <h2>Edit Cake</h2>
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
            value={name}
            required
          />             
          <label htmlFor="yummyness">Yummyness Level</label>
          <select
            name="yummyness"
            id="yummyness"
            placeholder="Select one"
            onChange={e => this.updateYumFactor(e.target.value)}
            className="cakeYummynessSelect"
            value={yumFactor}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <label htmlFor="commentArea">Comment</label>
          <textarea 
            name="commentArea"
            id="commentArea"
            placeholder="e.g. Best cake ever!"
            className="cakeCommentArea" 
            value={comment}
            onChange={e => this.updateComment(e.target.value)}
          />
              
          <button 
            type="submit"
            className="Buttons button_addCakeForm"
          >
            Edit Cake
          </button>

          <Link to='/' className="Buttons button_goBack">Go Back</Link>
        </fieldset> 
      </form>
     );
  }
}
 
export default EditCake;