import React from 'react';
import { Icon  } from 'antd';


const mockProjectList = [
  {
    key:1,
    title: 'Now',
    items: [
      {
        key:1,
        img:'',
        projectName: 'RAC Black Friday',
        description: 'There some text',
        updates:2,
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
        <div className="project-container" style={{background:'yellow',margin:'70px 100px'}}>
          ss
        </div>
      </div>
    )

  }
}
