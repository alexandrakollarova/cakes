import React, { Component } from 'react';
import CakeItem from './CakeItem';
import { Link } from 'react-router-dom';
import './Cakes.css';

class CakeList extends Component {

  render() { 
		const {cakes} = this.props
		
    return ( 
      <div className="CakeList">
        <h1>It's All About Cakes!</h1>
        {cakes.map(cake =>               
          <CakeItem 
            key={cake.id}
            id={cake.id}
            name={cake.name}
            comment={cake.comment}
            imageUrl={cake.imageUrl}
            yumFactor={cake.yumFactor}
            routeProps={this.props.routeProps}
            deleteCake={this.props.deleteCake}
          />
        )}
        <div className="addCakeSection">
          <Link 
            to='/add-cake' 
            className="Buttons button_addCake"
            type="button"
          >
            Add Cake
          </Link>
        </div>
         
      </div>
    );
  }
}
 
export default CakeList;