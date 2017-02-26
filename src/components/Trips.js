import React from 'react';
import {Link} from 'react-router'
import store from '../store'
import actions from '../actions'

export default class TripsView extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modal1Visible:false
    }
  }

  goToTripDetail() {
    store.dispatch(actions.routeTo('tripDetail'))
  }

  render(){

    return(
      <div>
        <img className="two-x-img"  src={require('../images/trip-main@2x.png')} alt=""/>
        <div onClick={()=>{this.goToTripDetail()}} className="hot-spot trip-main"></div>
      </div>
    )
  }
}
