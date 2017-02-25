import React from 'react';
import { Checkbox, Icon  } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import store from '../store'
import A from '../const/actionTypes'

const mockMailList = [
  {
    key:1,
    title: 'Most Recent',
    items: [
      {
        key: 0,
        from: 'Gene Aguilar',
        brief: 'Kick off of Business Mail App',
        tag:null,
        date: 'Feb, 3',
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
        date: 'Jan, 1'
      },{
        key:2,
        from: 'Some Person',
        brief: 'Trip to India',
        tag:'red',
        date: 'Jan, 2'
      }
    ]
  }
]

const mockHeadshot = [
  '../images/Screen Shot 2017-02-08 at 3.47.59 PM.png',
  '../images/Screen Shot 2017-02-08 at 3.48.03 PM.png',
  '../images/Screen Shot 2017-02-08 at 3.48.08 PM.png',
  '../images/Screen Shot 2017-02-08 at 3.48.19 PM.png',
  '../images/Screen Shot 2017-02-08 at 3.48.23 PM.png',
  '../images/sample-portrait.jpg',
]

class MailListItem extends React.Component{
  constructor(props,context){
    super(props,context);
    this.state = {
      like:false
    }
  }

  checkAllToggle(){

  }

  likeToggle(){
    this.setState({like:!this.state.like})
  }

  showModal(){
    store.dispatch({
      type: A.OPEN_PROJ_DIALOG
    })
  }

  render(){
    const state = this.state;
    let img = mockHeadshot[~~(Math.random()*6)];
    return(
      <div className="mail-list-item">
          <div className="mail-left-group">
            <Checkbox onChange={this.checkAllToggle}></Checkbox>
            <div className="marked-check" onClick={this.likeToggle}>
              <Icon type={state.like? "star":"star-o"}  style={{color: (state.like? '#ff9a00': 'inherit') }}/>
            </div>
            <div className="portrait">
              <span href="#" style={{background:'url('+ require('../images/sample-portrait.jpg')+')', backgroundSize:'cover'}}> </span>
            </div>
          </div>

          <div className="fromName">{this.props.from}</div>
          <div className="brief">{this.props.brief}</div>
          <div className="mail-right-group">
            { this.props.tag ? <span style={{background:this.props.tag,height:7,width:7,borderRadius:'50%'}}> </span> :
              <span className="unset-icon" onClick={this.showModal}>?</span>
            }
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
        {
          this.props.items ? this.props.items.map(item=>{
            return (<MailListItem {...item}/>)
          }) : null
        }

      </div>
    </div>
    )
  }
}

class GeneralView extends React.Component {
  constructor(){
    super()
    this.state = {
      likeAll: false,
      // mockMailList: originMockMailList
    }
  }

  likeAllToggle = ()=>{
    this.setState({likeAll:!this.state.likeAll})
  }

  getMailList() {
    const threads = this.props.threads
    const tags = this.props.tags
    const projects = this.props.projects || []
    const projectItems = this.props.projectItems || []
    if (threads) {
      let itemsToStore = []
      let labelList = []
      Object.keys(threads).forEach((threadKey, index) => {
        const thread = threads[threadKey]
        itemsToStore.push({
          // key: index + 1,
          from: thread.members ? thread.members[0] : '',
          brief: thread.snippet ? thread.snippet : '',
          date: thread.formatUpdateTime ? thread.formatUpdateTime : '',
          subject: thread.subject ? thread.subject : '',
        })

        if (thread.tag) {
          itemsToStore[index].name = thread.tag.name
          const projectIndex = projects.indexOf((thread.tag.name))
          if (!(projectIndex < 0) && projectItems[projectIndex]) {
            itemsToStore[index].color = projectItems[projectIndex].color
            // console.log('itemsToStore: ', itemsToStore[index])
          }
        }
      })

      return itemsToStore
    }
  }

  componentWillReceiveProps(nextProps) {
    // mockMailList[0].items = [...mockMailList[0].items, ...this.getMailList() || null]
    // mockMailList[0].items = mockMailList[0].items.concat(this.getMailList())
    // console.log('componentWillReceiveProps: ', mockMailList[0].items.length)
    // console.log('this.getMailList: ', this.getMailList().length)
    // console.log('this.getMailList(): ', this.getMailList())
    // this.setState({
    //   mockMailList: this.getMailList()
    //   mockMailLists: originMockMailList
    // })
  }

  render() {
    const state = this.state;
    //mockMailList[0].items = [...mockMailList[0].items, ...this.getMailList()||null]
    // mockMailList[1].items =

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

const mapStateToProps = (state) => {
  return {
    threads: state.threads,
    tags: state.tags,
    projects: state.projects,
    projectItems: state.projectItems,
    dialog: state.dialog
  }
}

const mapDispatchToProps = () => {
  return {
  }
}

const colorList = [
  'rgb(254, 153, 15)',
  'red',
  'yellow',
  'purple',
  'pink',
  'blue',
  'green'
]

export default connect(mapStateToProps, mapDispatchToProps)(GeneralView)
