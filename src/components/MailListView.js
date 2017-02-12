import React from 'react';
import actions from '../actions'
import { connect } from 'react-redux'
import { Input, Icon, Button, Collapse } from 'antd'

const Search = Input.Search,
      Panel = Collapse.Panel;



const PanelHeader = (props)=>(
  <div className="panel-header">
    <Icon type={props.iconType} />
    <span className="panel-header-title">{props.title||'Some Type'}</span>
    <Icon type="plus-circle-o" />
  </div>
)

const PanelItem = (props)=>(
  <div className="panel-item">
    <span style={{background:props.color,height:7,width:7,borderRadius:'50%'}}> </span>
    <span style={{flexGrow:1,paddingLeft:10}}>{props.title}</span>
    <span>{props.newCount}</span>
  </div>
)

class MailListView extends React.Component {
  render() {
    return (
      <div className="main-layout">
        <header className="header" style={styles.container} >
          <div className="icon-group" style={styles.iconGroup}>
            <span style={{fontSize:18,color:'#7d7d7d'}}><span style={{fontSize:20,color:'#FFA318'}}>B</span>usiness Mail</span>
          </div>
          <div className="search-group" style={styles.searchGroup}>
            <Search
              style={styles.searchBar}
              className="search-bar"
              placeholder="Search"
              onSearch={ val => console.log(val) }
            />
          </div>
          <div className="nav-menu-group" style={styles.navMenu}>
            <div className="hangout"><Icon type="aliwangwang" /></div>
            <div className="user-group">
              <div className="head-portrait">
                <span href="#" style={{background:'url('+ require('../images/sample-portrait.jpg')+')',backgroundSize:'cover'}}> </span>
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
        </header>
        <div className="main-content">
          <aside className="left-menu">
            <div className="compose-btn-container">
              <Button  onClick={e=>{ console.log('Compose') }}><Icon type="edit" />Compose</Button>
            </div>
            <div className="inbox-group">
              <div className="inbox-item inbox">
                <Icon type="mail" />
                <span className="inbox-title">Inbox</span>
                <span className="new-mail-count">2</span>
              </div>
              <div className="inbox-item starred">
                <Icon type="star-o" />
                <span className="inbox-title">Starred</span>
                <span className="new-mail-count"></span>
              </div>
              <div className="inbox-item drafts">
                <Icon type="file-text" />
                <span className="inbox-title">Drafts</span>
                <span className="new-mail-count"></span>
              </div>
              <div className="inbox-item sent">
                <Icon type="rocket" />
                <span className="inbox-title">Sent</span>
                <span className="new-mail-count"></span>
              </div>
            </div>
            <hr/>
            <div className="buddles-group">
              <h5>BUDDLES</h5>
              <Collapse bordered={false} defaultActiveKey={['1','2','3']}>
                {mockBuddles.map(item=>{
                  let {iconType,title,key} = item;
                  return (
                    <Panel header={<PanelHeader {...{iconType,title}} />} key={key}>
                      {item.items.map(subItem=>{
                        subItem.newCount = subItem.newCount||''
                        return (
                          <PanelItem {...subItem}/>
                        )
                      })}
                    </Panel>
                  )
                })}
              </Collapse>
            </div>

          </aside>
          <section className="view-container">
            {this.props.children|| "sub page content here" }
          </section>
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
    paddingLeft:20,
    fontFamily:'"helvetica neue", helvetica'
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

const mockBuddles = [
  {
    title:'Projects',
    iconType:'folder',
    key:1,
    items:[
      {
        key:1,
        color:'rgb(254, 153, 15)',
        title:'Larson',
        newCount:1
      },{
        key:2,
        color:'red',
        title:'MWC',
        newCount:9
      }
    ]
  },{
    title:'Trips',
    iconType:'rocket',
    key:2,
    items:[
      {
        key:1,
        color:'blue',
        title:'Larson',
        newCount:0
      }
    ]
  },{
    title:'Others',
    iconType:'appstore-o',
    key:3,
    items:[
      {
        key:1,
        color:'green',
        title:'Larson',
        newCount:0
      }
    ]
  }

]

export default connect(mapStateToProps, mapDispatchToProps)(MailListView)
