import React from 'react';
import { Checkbox, Icon  } from 'antd';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import store from '../store'
import A from '../const/actionTypes'
import { headShots } from '../const/headshots'

const mockMailList = [
  {
    key:1,
    title: 'Unread',
    items: [
      {
        key: 1,
        from: 'Gene Aguilar',
        brief: 'Kickoff for retail project',
        tag:null,
        date: 'Feb, 27',
        unique: 1
      },
      {
        key: 2,
        from: 'Jack Chavez',
        brief: '[JIRA] (LAR-713)FSO-512 bug fix for double data',
        tag: 'orange',
        date: 'Feb, 27',
        unique: 2
      },
      {
        key: 3,
        from: 'Jerry Mullins',
        brief: '[Github] Jerry merged code on branch ',
        tag:'orange',
        date: 'Feb, 27',
        unique: 3
      },
      {
        key: 4,
        from: 'Ronald Smith',
        brief: '[business-os/mwc-recognition-demo] changing the button design (#43)',
        tag:'orange',
        date: 'Feb, 27',
        unique: 4
      }
    ]
  },{
    key:2,
    title: 'Most recent',
    items: [
      {
        key:1,
        from: 'Ronald S(GDrive)',
        brief: 'FSO - Invitation to collaborate',
        tag:'orange',
        date: 'Feb, 25',
        unique: 5
      },{
        key:2,
        from: 'Amy Robinson',
        brief: 'New updates from US team of mobility',
        tag:'yellow',
        date: 'Feb, 26',
        unique: 6
      },{
        key:3,
        from: 'Michelle M(InVision)',
        brief: 'Re: [FSO V3] Mobile screen 07 [4]',
        tag:'orange',
        date: 'Feb, 25',
        unique: 7
      },{
        key:4,
        from: 'SDC China Finance',
        brief: 'Exchange Rate for Per Diem Reporting Purpose - February 2017',
        tag:'green',
        date: 'Feb, 25',
        unique: 8
      }
    ]
  },
  {
    key:3,
    title: 'This month',
    items: [
      {
        key:1,
        from: 'American Express',
        brief: 'ITINERARY for ROBINSON/SAM SAT 3FEB2017 Ref ICEGSE',
        tag:'purple',
        date: 'Feb, 20',
        unique: 9
      },{
        key:2,
        from: 'PwC China Travel Advisory',
        brief: 'Concur Hotel Reservation at NEW YORK',
        tag:'purple',
        date: 'Feb, 19',
        unique: 10
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
    const item = this.props.item ? this.props.item : {}
    console.log(headShots[item.unique])
    let img = mockHeadshot[~~(Math.random()*6)];
    return(
      <div className="mail-list-item">
          <div className="mail-left-group">
            <Checkbox onChange={this.checkAllToggle}></Checkbox>
            <div className="marked-check" onClick={this.likeToggle}>
              <Icon type={state.like? "star":"star-o"}  style={{color: (state.like? '#ff9a00': 'inherit') }}/>
            </div>
            <div className="portrait">
{/*              <span href="#" style={{background:'url('+ require('../images/sample-portrait.jpg')+')', backgroundSize:'cover'}}> </span>*/}
{/*              <span href="#" style={{background: `url('${headShots[item.unique]}')`, backgroundSize:'cover'}}> </span>*/}
              <img
                src={headShots[item.unique]}
                style={{height: 30, width: 30, borderRadius: '50%'}}/>
            </div>
          </div>

          <div className="fromName">{item.from}</div>
          <div className="brief">{item.brief}</div>
          <div className="mail-right-group">
            { item.tag ? <span style={{background:item.tag,height:7,width:7,borderRadius:'50%'}}> </span> :
              <span className="unset-icon" onClick={this.showModal}>?</span>
            }
            <span style={{paddingLeft:10}}>{item.date}</span>
          </div>
      </div>
    )
  }
}

class MailListGroup extends React.Component{
  render(){
    const isGroupOne = (this.props.group.key === 1)
    const items = this.props.group.items
    const realMail = this.props.realMail
    return (
    <div>
      <div className="mail-group-title">{this.props.title}</div>
      <div className="mail-list">
        {
          // this.props.group.items ? this.props.group.items.map(item=>{
          //   return (<MailListItem {...item}/>)
          // }) : null
          isGroupOne && items ? (
            <div>
              <MailListItem
                item={realMail}/>
              {
                items.map((item) => {return <MailListItem item={item}/>})
              }
            </div>
          ) : (
            <div>
              {
                items.map((item) => {return <MailListItem item={item}/>})
              }
            </div>
          )
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
    const firstThread = this.props.threads ? Object.values(this.props.threads)[0] : null
    let realMail = firstThread ? {
      key: 0,
      from: firstThread.members ? firstThread.members[0] : '',
      brief: firstThread.snippet,
      tag: null,
      date: firstThread.formatUpdateTime ? firstThread.formatUpdateTime : '',
      unique: 0,
      real: true,
    } : null
    // console.log('mockMailList: ', mockMailList[0].items)

    return (
      <div style={{height:'100%'}}>
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
        {mockMailList.map((group, index) => {
          return (
            <MailListGroup
              group={group}
              realMail={realMail}
              key={index}/>
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
  'blue',
  'purple',
  'pink',
  'blue',
  'green'
]

export default connect(mapStateToProps, mapDispatchToProps)(GeneralView)
