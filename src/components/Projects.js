import React from 'react';
import { Icon  } from 'antd';

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
      <div style={{height:'100%',overflowY:'scroll'}} >
        <h3>Title</h3>

      </div>
    )

  }
}
