import React from 'react';
import { Icon  } from 'antd';
import store from '../store'
import actions from '../actions'


const mockProjectList = [
  {
    key:1,
    title: 'Now',
    items: [
      {
        key:1,
        img:'',
        projectName: 'RAC Black Friday',
        description: 'There are many things that are important to catolog design. Your images must be sharp and appealing. Your text and even.',
        updates:2,
        during: 'Aug, 4 - Aug, 25',
        person: [
          {
            img:'asd'
          }
        ]
      },
      {
        key:2,
        img:'',
        projectName: 'RAC Black Friday',
        description: 'There some text',
        updates:0,
        during: 'Aug, 4 - Aug, 25',
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
              {this.props.updates?`${this.props.updates} NEW UPDATES`:'LAUNCH'}
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
