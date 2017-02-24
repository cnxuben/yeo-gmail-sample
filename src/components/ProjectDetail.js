import React from 'react';
import {Link} from 'react-router'
import { ProjDetail1 ,ProjDetail2,ProjDetail3} from './Modal';

export default class ProjectDetail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modal1Visible:false,
      modal2Visible:false,
      modal3Visible:false
    }
  }

  showModal(num){
    num === 0 && this.setState({modal1Visible:false,modal2Visible:false,modal3Visible:false});
    num === 1 && this.setState({modal1Visible:true,modal2Visible:false,modal3Visible:false});
    num === 2 && this.setState({modal1Visible:false,modal2Visible:true,modal3Visible:false});
    num === 3 && this.setState({modal1Visible:false,modal2Visible:false,modal3Visible:true});
    console.log(num)
  }


  render(){

    return(
      <div>
        <div onClick={()=>{this.showModal(1)}} className="hot-spot proj-detail-modal-1"></div>
        <img  src={require('../images/project-detail.png')} alt=""/>
        <ProjDetail1 title=""
                     visible={this.state.modal1Visible}
                     onOk={()=>{this.showModal(2)}}
                     onCancel={()=>{this.showModal(0)}}
                     okText="YES,CREATE A NEW"

                     maskClosable={true}
                     width="50%"/>
        <ProjDetail2 title=""
                     visible={this.state.modal2Visible}
                     onOk={()=>{this.showModal(3)}}
                     onCancel={()=>{this.showModal(0)}}
                     okText="YES,CREATE A NEW"
                     maskClosable={true}
                     width="50%"/>
        <ProjDetail3 title=""
                     visible={this.state.modal3Visible}
                     onOk={()=>{this.showModal(0)}}
                     onCancel={()=>{this.showModal(0)}}
                     okText="YES,CREATE A NEW"
                     maskClosable={true}
                     width="50%"/>
      </div>
    )
  }
}
