import React from 'react';
import cake_icon from './icons/cake_icon.png';
import { Link } from 'react-router-dom';

const CakeComments = (props) => {

  let cakesInfo = props.cakes.find(cake => cake.id == props.routeProps.match.params.id)

  return ( 
    <>
      {cakesInfo && 
        <div className="CakeInfo">
          <div className="Cake_headerContainer">
            <img src={cake_icon} alt="cake_icon" />
            <h2>{cakesInfo.name}</h2>
          </div>
          <ul className="Comments">
              <li key={cakesInfo.id}>"{cakesInfo.comment}"</li>
          </ul>
          <Link to='/' className="Buttons button_goBack">Go Back</Link>
        </div>
      }
    </>
  );
}
 
export default CakeComments;