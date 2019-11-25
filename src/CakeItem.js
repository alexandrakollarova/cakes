import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import config from './config';
import cake_icon from './icons/cake_icon.png';

class CakeItem extends Component {
	handleViewComments(id) {
		fetch(`${config.url}/cakes/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
		)
		.then(resComments => {
			if (!resComments.ok) {
				return resComments.json().then(err => Promise.reject(err))
			}
			return resComments.json();
		})
		.then(cake => {
				this.props.routeProps.history.push(`/${cake.id}`)
		})
		.catch(err => console.log(err))
	}

	handleEditCake(id) {
		fetch(`${config.url}/cakes/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
		)
		.then(resComments => {
			if (!resComments.ok) {
				return resComments.json().then(err => Promise.reject(err))
			}
			return resComments.json();
		})
		.then(cake => {
				this.props.routeProps.history.push(`/edit-cake/${cake.id}`)
		})
		.catch(err => console.log(err))
	}

	handleDeleteCake(id) {
		fetch(`${config.url}/cakes/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
		)
		.then(res => {
			if (!res.ok) {
				return res.json().then(err => Promise.reject(err))
			}
			return res.json();
		})
		.then(cake => {
				this.props.deleteCake(cake.id)
				this.props.routeProps.history.push(`/`)
		})
		.catch(err => console.log(err))
	}

  render() { 
		const { id, name, yumFactor } = this.props

    return (	
      <ul className="CakeItem">
        <li>
					<div className="Cake_headerContainer">
						<img src={cake_icon} alt="cake_icon" />

						<NavLink to={`/${id}`}>
							<h2>{name}</h2>  
						</NavLink>
					</div>
					<h4 className="yumFactor">Yum Factor: {yumFactor}</h4>

					<button 
            type="button"
						className="Buttons button_viewComments"
            onClick={() => this.handleViewComments(id)}
          >
            View Comments
          </button>

					<button 
            type="button"
						className="Buttons button_editCake"
            onClick={() => this.handleEditCake(id)}
          >
            Edit Cake
          </button>

					<button 
            type="button"
						className="Buttons"
            onClick={() => this.handleDeleteCake(id)}
          >
            Delete Cake
          </button>         				
    		</li>
  		</ul> 
 	  );
  }
}
 
export default CakeItem;