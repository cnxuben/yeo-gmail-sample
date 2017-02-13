import React from 'react';
import { Checkbox, Icon  } from 'antd';

const mockMailList = [
  {
    key:1,
    title: 'Today',
    items: [
      {
        key:1,
        from: 'Some Person',
        brief: 'Trip to India',
        tag:'red',
        date: 'Aug, 1'
      },{
        key:2,
        from: 'Some Person',
        brief: 'Trip to India',
        tag:'red',
        date: 'Aug, 2'
      }
    ]
  },{
    key:2,
    title: 'January',
    items: [
      {
        key:1,
        from: 'Some Person',
        brief: 'Trip to India',
        tag:'red',
        date: 'Aug, 1'
      },{
        key:2,
        from: 'Some Person',
        brief: 'Trip to India',
        tag:'red',
        date: 'Aug, 2'
      }
    ]
  }
]

class MailListItem extends React.Component{
  constructor(){
    super();
    this.state = {
      like:false
    }
  }

  checkAllToggle(){

  }

  likeToggle = ()=>{
    this.setState({like:!this.state.like})
  }

  render(){
    const state = this.state;
    return(
      <div className="mail-list-item">
          <div className="mail-left-group">
            <Checkbox onChange={this.checkAllToggle}></Checkbox>
            <div className="marked-check" onClick={this.likeToggle}>
              <Icon type={state.like? "star":"star-o"}  style={{color: (state.like? '#ff9a00': 'inherit') }}/>
            </div>
            <div className="portrait">
              <span href="#" style={{background:'url('+ require('../images/sample-portrait.jpg')+')',backgroundSize:'cover'}}> </span>
            </div>
          </div>

          <div className="fromName">{this.props.from}</div>
          <div className="brief">{this.props.brief}</div>
          <div className="mail-right-group">
            <span style={{background:this.props.tag,height:7,width:7,borderRadius:'50%'}}> </span>
            <span style={{paddingLeft:10}}>{this.props.date}</span>
          </div>
      </div>
    )
  }
}

class MailListGroup extends React.Component{
  render(){
    return (
    <div>
      <div className="mail-group-title">{this.props.title}</div>
      <div className="mail-list">
        {this.props.items.map(item=>{
          return (<MailListItem {...item}/>)
        })}

      </div>
    </div>
    )
  }
}

export default class GeneralView extends React.Component {
  constructor(){
    super()
    this.state = {
      likeAll: false
    }
  }

  likeAllToggle = ()=>{
    this.setState({likeAll:!this.state.likeAll})
  }


  render() {
    const state = this.state;
    return (
      <div style={{height:'100%',overflowY:'scroll'}}>
        <div className="mail-menu">
          <div className="menu-left-group">
            <Checkbox onChange={()=>{console.log('check')}}></Checkbox>
            <div className="marked-check" onClick={this.likeAllToggle} >
              <Icon type={state.likeAll? "star":"star-o"}  style={{color: (state.likeAll? '#ff9a00': 'inherit') }}/>
            </div>
            <div className="remove-checked">
              <Icon type="delete" />
            </div>
          </div>
          <div className="menu-right-group">
            {/*<div className="pagination">Page 1</div>*/}
            <div className="mail-calendar">
              <Icon type="calendar" style={{color:'#1CD67C'}}/>
            </div>
          </div>

        </div>
        {mockMailList.map(group=>{
          return (
            <MailListGroup {...group} />
          )
        })}


      </div>
    );
  }
}

