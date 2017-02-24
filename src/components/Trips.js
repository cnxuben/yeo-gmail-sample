import React from 'react';
import {Link} from 'react-router'



export default class TripsView extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modal1Visible:false
    }
  }



  render(){

    return(
      <div>
        <div onClick={()=>{}} className="hot-spot trip-main"></div>
        <img  src={require('../images/trip-main.png')} alt=""/>
      </div>
    )
  }
}
