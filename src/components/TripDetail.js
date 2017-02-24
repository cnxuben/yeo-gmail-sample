import React from 'react';
import {Link} from 'react-router'
import {TripDetail1} from './Modal'

export default class TripDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modal1Visible:false
    }
  }

  showModal(num){
    num === 0 && this.setState({modal1Visible:false});
    num === 1 && this.setState({modal1Visible:true});

    console.log(num)
  }



  render(){

    return(
      <div>
        <div onClick={()=>{this.showModal(1)}} className="hot-spot trip-detail-modal"></div>
        <img  src={require('../images/trip-detail.png')} alt=""/>

        <TripDetail1 title=""
                     visible={this.state.modal1Visible}
                     onOk={()=>{this.showModal(0)}}
                     onCancel={()=>{this.showModal(0)}}
                     okText="YES,CREATE A NEW"

                     maskClosable={true}
                     width="50%"/>
      </div>
    )
  }
}
