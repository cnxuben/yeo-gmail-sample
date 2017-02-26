import React from 'react';
import { Icon  } from 'antd';
import store from '../store'
import actions from '../actions'


const mockProjectList = [
  {
    key:1,
    title: 'This month',
    items: [
      {
        key:1,
        img:'',
        projectName: 'Retail',
        description: 'evolution of retail, information to right people at a right time',
        updates:0,
        during: 'Feb 27,2017 - Today',
        person: [
          {
            img:'asd'
          }
        ]
      },
      {
        key:2,
        img:'',
        projectName: 'FSO',
        description: 'Improve field service efficiency with optimized scheduling and location service.',
        updates:5,
        during: 'Aug 24, 2016 - Today',
        person: [
          {
            img:'asd'
          }
        ]
      }
    ]
  },
  {
    key:2,
    title: 'January',
    items: [
      {
        key:1,
        img:'',
        projectName: 'Mobility',
        description: 'make your journey as easy as possible',
        updates:1,
        during: ' Jan 9, 2016 - Jan 22, 2017',
        person: [
          {
            img:'asd'
          }
        ]
      },
      {
        key:2,
        img:'',
        projectName: 'Salesforce intergration',
        description: 'See your user and company data, conversations from Intercom inside your Salesforce account',
        updates:1,
        during: 'May 15, 2016 - Jan 10, 2017',
        person: [
          {
            img:'asd'
          }
        ]
      }
    ]
  }
]

class ProjectItem extends React.Component{
  goToProjectDetail() {
    store.dispatch(actions.routeTo('projectDetail'))
  }

  render() {
    return (
      <div
        className="project-item"
        onClick={this.goToProjectDetail.bind(this)}>
        <span className="bg" style={{backgroundImage:'url('+ require('../images/sample-proj.jpg')+')'}}> </span>
        <div className="project-content">
          <div className="project-upper">
            <div className="proj-header">
              <div className="title">{this.props.projectName||'Project Name'}</div>
              <div className="right-group">
                <div className="duration">{this.props.during||''}</div>
                <Icon type="ellipsis" style={{cursor:'pointer'}}/>
              </div>
            </div>
            <p className="proj-descrip">
              {this.props.description||'No description.'}
            </p>
          </div>
          <div className="project-under">
            <div className="heads">
              <span className="head" style={{backgroundImage:'url('+ require('../images/Screen Shot 2017-02-08 at 3.47.59 PM.png')+')'}}> </span>
              <span className="head" style={{backgroundImage:'url('+ require('../images/Screen Shot 2017-02-08 at 3.48.03 PM.png')+')'}}> </span>
              <span className="head" style={{backgroundImage:'url('+ require('../images/Screen Shot 2017-02-08 at 3.48.08 PM.png')+')'}}> </span>
              <span className="head" style={{backgroundImage:'url('+ require('../images/Screen Shot 2017-02-08 at 3.48.19 PM.png')+')'}}> </span>
              <span className="head" style={{backgroundImage:'url('+ require('../images/Screen Shot 2017-02-08 at 3.48.23 PM.png')+')'}}> </span>
            </div>
            <div className="updates">
              {this.props.updates?`${this.props.updates} NEW UPDATES`:'NEW LAUNCH'}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

class ProjectGroup extends React.Component{
  render(){
    return (
      <div className="project-group">
        <h3>{this.props.title || 'Latest'}</h3>
        {this.props.items? this.props.items.map(item=>(
          <ProjectItem {...item}/>
          )) :null}
      </div>
    )
  }
}

export default class ProjectsView extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      type: '',
      subType: ''
    }
  }

  render() {
    const {type, subType} = this.state;

    return (
      <div style={{height:'100%',overflowY:'scroll',background:'#F2F5F4'}} >
        <div className="project-container" style={{margin:'60px auto', width:'80%'}}>
          {
            mockProjectList.map((item)=>(
                <ProjectGroup {...item}/>
              ))
          }

        </div>
      </div>
    )

  }
}
