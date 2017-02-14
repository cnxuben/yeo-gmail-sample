import React from 'react';
import actions from '../actions'
import { connect } from 'react-redux'
import { Input, Icon, Button, Collapse } from 'antd'
import utf8 from 'utf8'
// const userId = 'singh.raghverndra@businessos.net'
const userId = 'me'

const Search = Input.Search,
  Panel = Collapse.Panel;


const PanelHeader = (props)=>(
  <div className="panel-header">
    <Icon type={props.iconType} />
    <span className="panel-header-title" onClick={(e)=>{props.toProjects(e,props.title,null)}}>{props.title||'Some Type'}</span>
    <Icon type="plus-circle-o" />
  </div>
)

const PanelItem = (props)=>(
  <div className="panel-item">
    <span style={{background:props.color,height:7,width:7,borderRadius:'50%'}}> </span>
    <span style={{flexGrow:1,paddingLeft:10,cursor:'pointer'}} onClick={(e)=>{props.toProjects(e,props.parentTitle,props.title)}}>
      {props.title}
      </span>
    <span>{props.newCount}</span>
  </div>
)

class MailListView extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      messageAndThreadIds: [],
      viewType:'',
      viewFilter:''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.listMessages(userId, 'businessos', (results) => {
        this.setState({
          messageAndThreadIds: results
        })
      })
    }, 3000)
  }

  listMessages(userId, query, callback) {
    let getPageOfMessages = (request, result) => {
      request.execute(function(resp) {
        result = result.concat(resp.messages)
        let nextPageToken = resp.nextPageToken
        // Deliberately restricted multiple calls since it was an POC
        // In actual code hardcoded pageToken ('02715675988415759326')
        // should be removed.
        if (nextPageToken == '02715675988415759326') {
          request = window.gapi.client.gmail.users.messages.list({
            'userId': userId,
            'pageToken': nextPageToken,
            'q': query
          });
          getPageOfMessages(request, result)
        } else {
          callback(result)
        }
      })
    }
    let initialRequest = window.gapi.client.gmail.users.messages.list({
      'userId': userId,
      'q': query
    })
    getPageOfMessages(initialRequest, [])
  }

  getMessage(userId, messageId, format, callback) {
    var request = window.gapi.client.gmail.users.messages.get({
      'userId': userId,
      'id': messageId,
      'format': format
    });
    request.execute(callback)
  }

  decodeUrlSafeBase64(s) {
    return atob(s.replace(/\-/g, '+').replace(/\_/g, '/'))
  }

  toMailList(type){
    this.props.router.replace(`mailbox/${type}`);
    this.setState({
      viewType:'general',
      viewFilter:'inbox'
    })
  }

  toProjects(e,type,subType){
    e.stopPropagation();
    //this.props.router.push(`mailbox/project`);
      console.log(type,subType)
      // this.setState({
      //   viewType:type,
      //   viewFilter:{
      //     type:'',
      //     subType:''
      //   }
      // })
  }

  render() {
    let messages = this.state.messageAndThreadIds.splice(1, 1)
    messages.length > 0 ? (
      messages.map((value) => {
        this.getMessage(userId, value.id, 'raw', (result) => {
          // console.log(result) // log whole result object
          // console.log(this.decodeUrlSafeBase64(result.raw)) // log whole message <HTML> data
          // console.log(utf8.decode(this.decodeUrlSafeBase64(result.raw))) // log whole email data with utf8 encoding
        })
      })
    ) : null

      // <button onClick={this.props.listThreads} >try api here</button>
    return (
      <div className="main-layout">
        <header className="header" style={styles.container} >
          <div className="icon-group" style={styles.iconGroup}>
            <span style={{fontSize:18,color:'#7d7d7d'}}><span style={{fontSize:20,color:'#1CD67C'}}>B</span>usiness Mail</span>
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
              <div className={`inbox-item inbox ${ this.state.viewFilter === 'inbox'?'active':'' }`}  onClick={ ()=>{this.toMailList('general')}}>
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
                    <Panel header={<PanelHeader {...{iconType,title}} toProjects={this.toProjects}/>}  key={key}>
                      {item.items.map(subItem=>{
                        subItem.newCount = subItem.newCount||''
                        return (
                          <PanelItem {...subItem} parentTitle={title} toProjects={this.toProjects}/>
                        )
                      })}
                    </Panel>
                  )
                })}
              </Collapse>
            </div>

          </aside>
          <section className="view-container">
            {this.props.children|| <button onClick={this.props.listThreads} >try api here</button> }
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    threads: state.threads
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listThreads: () => dispatch(actions.listThreads())
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
