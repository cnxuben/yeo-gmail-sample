import React from 'react';
import { Modal, Form, Row, Col, Input, DatePicker, Mention  } from 'antd';
import enUS from 'antd/lib/date-picker/locale/en_US';

const FormItem = Form.Item,
      RangePicker = DatePicker.RangePicker,
      Nav = Mention.Nav,
      { getMentions } = Mention;


const people = [
  { name: 'Tom', type: 'tom.w@pwc.com' },
  { name: 'Sam', type: 'sam.w@pwc.com' },
  { name: 'Jack', type: 'jack.w@pwc.com'},
  { name: 'Mary', type: 'mary.w@pwc.com' },
  { name: 'Django', type: 'django.w@pwc.com' },
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
        <span>{suggestion.name} - {suggestion.type}</span>
      </Nav>);
    this.setState({ suggestions });
  }


  render(){
    const { getFieldDecorator } = this.props.form,
          { suggestions } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={40}>
          <Col span={12}>
            <FormItem label="Buddle Name">
              {getFieldDecorator('name')(<Input placeholder=""/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={12}>
            <FormItem label="Buddle Type">
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
            <FormItem label="Cooperators">
              {getFieldDecorator('cooperator')( <Mention
                placeholder="@someone"
                style={{ width: '100%'}}
                suggestions={suggestions}
                onSearchChange={this.onSearchChange}
                onSelect={onSelect}
              />)}

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
    console.log( this.refs.form1.getFieldsValue(),getMentions(cooperator))

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

export {BuddleModal}
