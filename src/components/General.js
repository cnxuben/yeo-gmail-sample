import React from 'react';
import { Checkbox, Icon  } from 'antd';
import { connect } from 'react-redux'

const mockMailList = [
  {
    key:1,
    title: 'Most Recent',
    // items: []
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
      likeAll: false
    }
  }

  likeAllToggle = ()=>{
    this.setState({likeAll:!this.state.likeAll})
  }

  getMailList() {
    const threads = this.props.threads
    const tags = this.props.tags
    if (threads) {
      let itemsToStore = []
      let labelList = []
      Object.keys(threads).map((threadKey, index) => {
        const thread = threads[threadKey]
        itemsToStore.push({
          key: index + 1,
          from: thread.members ? thread.members[0] : '',
          brief: thread.snippet ? thread.snippet : '',
          date: thread.formatUpdateTime ? thread.formatUpdateTime : '',
          subject: thread.subject ? thread.subject : '',
        })

        const tagIndex = tags.findIndex((tag) => {
          return tag.threadId === threadKey
        })

        if (tagIndex > 0) {
          const flag = labelList.indexOf(tags[tagIndex].name)
          console.log('flag hrere: ', flag)
          if (flag < 0) {
            labelList.push(tags[tagIndex].name)
          }
          itemsToStore[index].name = tags[tagIndex].name ? tags[tagIndex].name : null
          itemsToStore[index].tag = colorList[flag]
        }
      })

      return itemsToStore
    }
  }

  render() {
    const state = this.state;
    mockMailList[0].items = this.getMailList()
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
    tags: state.tags
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
