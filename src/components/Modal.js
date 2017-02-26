import React from 'react';
import { Modal, Form, Row, Col, Input, DatePicker, Mention  } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';
import moment from 'moment';

const FormItem = Form.Item,
      RangePicker = DatePicker.RangePicker,
      Nav = Mention.Nav,
      { getMentions } = Mention;

const dateFormat = 'YYYY-MM-DD';


const people = [
  { name: 'Sam Robinson', type: 'sam.robinson@pwc.com', icon:'../images/Screen Shot 2017-02-08 at 3.47.59 PM.png' },
  { name: 'Jack Chavez', type: 'jack.chavez@pwc.com', icon:'../images/Screen Shot 2017-02-08 at 3.48.03 PM.png'  },
  { name: 'Wayne Hayes', type: 'wayne.hayes@pwc.com', icon:'../images/Screen Shot 2017-02-08 at 3.48.08 PM.png' },
  { name: 'Frank Porter', type: 'frank.porter@pwc.com' , icon:'../images/Screen Shot 2017-02-08 at 3.48.19 PM.png' },
  { name: 'Ronald Smith', type: 'ronald.smith@pwc.com' , icon:'../images/Screen Shot 2017-02-08 at 3.48.23 PM.png' },
  { name: 'Ida McCormick', type: 'ida.mccormick@pwc.com' , icon:'../images/Screen Shot 2017-02-08 at 3.47.59 PM.png' }
];

function onSelect(suggestion, data) {
  console.log('onSelect', suggestion, data);
}

class BuddleModalForm extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  state = {
    suggestions: [],
  }

  onSearchChange = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = people.filter(item =>
      item.name.toLowerCase().indexOf(searchValue) !== -1
    );
    const suggestions = filtered.map(suggestion =>
      <Nav value={suggestion.name} data={suggestion}>
        <img alt={suggestion.name} style={{ height: 16, width: 16, marginRight: 5, float: 'left' }} src={suggestion.icon} />
        <span>{suggestion.name} - {suggestion.type}</span>
      </Nav>);
    this.setState({ suggestions });
  }

  componentDidMount(){
    this.props.form.setFieldsValue({
      name:'Retail',
      type:'Project',
      description:'',
      dateRange:[moment('2017-02-27', dateFormat)],
      // cooperator: Mention.toEditorState('@Sam @Jack @Wayne @Frank @Ronald @Ida')
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form,
          { suggestions } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={40}>
          <Col span={12}>
            <FormItem label="Name">
              {getFieldDecorator('name')(<Input placeholder=""/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={12}>
            <FormItem label="Type">
              {getFieldDecorator('type')(<Input placeholder=""/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="Range time">
              {getFieldDecorator('dateRange')(<RangePicker  locale={enUS} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={24}>
            <FormItem label="Description">
              {getFieldDecorator('description')(<Input placeholder=""/>)}

            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={24}>
            <FormItem label="Who's joining">
              {/*{getFieldDecorator('cooperator')( <Mention*/}
                {/*placeholder="@someone"*/}
                {/*style={{ width: '100%'}}*/}
                {/*suggestions={suggestions}*/}
                {/*onSearchChange={this.onSearchChange}*/}
                {/*onSelect={onSelect}*/}
              {/*/>)}*/}
              <Mention
                placeholder="@someone"
                style={{ width: '100%'}}
                suggestions={suggestions}
                onSearchChange={this.onSearchChange}
                onSelect={onSelect}
                defaultValue={Mention.toEditorState('@Sam @Jack @Wayne @Frank @Ronald @Ida')}
              />

            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

const BuddleForm = Form.create()(BuddleModalForm);

class BuddleModal extends React.Component{

  getFormData(){
    //debugger;
    let {cooperator} = this.refs.form1.getFieldsValue();
    console.log( this.refs.form1.getFieldsValue())
    // console.log( this.refs.form1.getFieldsValue(),getMentions(cooperator))

    this.props.close();
  }

  render(){

    return(
    <Modal {...this.props}
      onOk={()=>{this.getFormData()}}
    >
      <BuddleForm ref="form1"/>
    </Modal>
    )
  }
}



class NewProjModal extends React.Component{
  render(){
    return(
      <Modal {...this.props}>
        <img src={require('../images/2017-02-21_220838.png')} alt=""/>
      </Modal>
    )
  }
}

class ProjDetail1 extends React.Component{
  render(){
    return(
      <Modal {...this.props} className="override-modal proj-detail-modal1">
        <img onClick={this.props.onOk} src={require('../images/project-detail-modal1@2x.png')} alt="" style={{width:'100%'}}/>
      </Modal>
    )
  }
}

class ProjDetail2 extends React.Component{
  render(){
    return(
      <Modal {...this.props} className="override-modal proj-detail-modal2">
        <img onClick={this.props.onOk} src={require('../images/project-detail-modal2@2x.png')} alt="" style={{width:'100%'}}/>
      </Modal>
    )
  }
}

class ProjDetail3 extends React.Component{
  render(){
    return(
      <Modal {...this.props} className="override-modal proj-detail-modal3">
        <img onClick={this.props.onOk} src={require('../images/project-detail-modal3@2x.png')} alt="" style={{width:'100%'}}/>
      </Modal>
    )
  }
}


class TripDetail1 extends React.Component{
  render(){
    return(
      <Modal {...this.props} className="override-modal trip-detail-modal1">
        <img onClick={this.props.onOk} src={require('../images/tripmail@2x.png')} alt="" style={{width:'100%'}}/>
      </Modal>
    )
  }
}


export {BuddleModal,NewProjModal,ProjDetail1,ProjDetail2,ProjDetail3,TripDetail1}
