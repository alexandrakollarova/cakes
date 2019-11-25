import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class CakeItem extends Component {

  render() { 
		const { id, name, yumFactor } = this.props

    return (	
      <ul className="CakeItem">
        <li>
					<div className="Cake_headerContainer">
						<img src="" alt="cake_icon" />

						<NavLink to={`/${id}`}>
							<h2>{name}</h2>  
						</NavLink>
					</div>
					<h4 className="yumFactor">Yum Factor: {yumFactor}</h4>
         				
    		</li>
  		</ul> 
 	  );
  }
}
 
export default CakeItem;