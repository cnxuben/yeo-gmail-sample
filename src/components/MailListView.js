// require('normalize.css/normalize.css');
// require('../styles/App.css')
// require('antd/dist/antd.css')
//import 'antd/dist/antd.css'
//import '../styles/App.css'

import React from 'react';
import actions from '../actions'
import { connect } from 'react-redux'
import { Input, Icon } from 'antd'

const Search = Input.Search;

class MailListView extends React.Component {
  render() {
    return (
      <div className="index" style={styles.container} >
        <div className="icon-group" style={styles.iconGroup}>
          <span style={{fontSize:18,color:'#7d7d7d'}}><span style={{fontSize:20,color:'#FFA318'}}>B</span>usiness Mail</span>
        </div>
        <div className="search-group" style={styles.searchGroup}>
          <Search
            style={styles.searchBar}
            className="search-bar"
            placeholder="Search"
            onSearch={ val=> console.log(val) }
          />
        </div>
        <div className="nav-menu-group" style={styles.navMenu}>
          <div className="hangout"><Icon type="aliwangwang" /></div>
          <div className="user-group">
            <div className="head-portrait">
              <span href="#" style={{background:'url('+ require('../images/sample-portrait.jpg')+')',backgroundSize:'cover'}}></span>
            </div>
            <div style={{paddingLeft:'1rem'}} className="user-name">
              <span>
                Aragaki Yui
              </span>
            </div>
          </div>
          <div className="header-menu">
            <Icon type="bars" />
          </div>


        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // return { auth: state.auth, }
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const styles = {
  container: {
    margin: 0,
    height:60
  },
  iconGroup: {
    width: 200,
    paddingLeft:20
  },
  searchGroup: {
    flexGrow:1
  },
  searchBar: {
  },
  navMenu:{
    minWidth: '20vw',
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailListView)
