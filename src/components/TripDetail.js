import React from 'react';
// import {Link} from 'react-router'
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

  goToGoogleDrive() {
    window.open('https://docs.google.com/a/businessos.net/spreadsheets/d/1LSEmrGFGxvtD4Lbruml1ysSBWHKmOzp2hu0IYmODh1E/edit?usp=sharing')
  }

  render(){

    return(
      <div
        style={{width: 940, height: 900}}>
        {/*<img className="two-x-img"  src={require('../images/trip-detail@2x.png')} alt=""/>*/}
        <img style={{maxHeight: '100%', maxWidth: '100%'}}  src={require('../images/trip-detail@2x.png')} alt=""/>
        <div onClick={()=>{this.goToGoogleDrive()}} className="hot-spot go-to-google-drive"></div>
        <div onClick={()=>{this.showModal(1)}} className="hot-spot trip-detail-modal"></div>
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
