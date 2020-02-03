
import * as React from "react";
import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, InputNumber, Button, Select } from 'antd';
import { toLocalStorage, fromLocalStorage } from '../../services/localStorage';

const { Option } = Select;

const hasErrors = (fieldsError) => Object.keys(fieldsError).some(field => fieldsError[field]);

const OrderForm: React.FC = (props: FormComponentProps) => {

    const { form } = props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;
    // this.props.form.validateFields();

    const handleSubmit = e => {
        e.preventDefault();

        form.validateFields((err, values) => {
            if (!err) {
                // toLocalStorage({...values});
            }
        });
    };

    const pairField = () => (
        <Form.Item>
          {getFieldDecorator('pair', {
            rules: [{ 
                required: true, 
                message: 'Please select pairs!' 
            }],
          })(
            // <Select defaultValue="lucy" onChange={handleChange}>
            <Select defaultValue="lucy">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
            </Select>
          )}
        </Form.Item>
    );

    const sideField = () => (
        <Form.Item>
          {getFieldDecorator('side', {
            rules: [{ 
                required: true, 
                message: 'Please select action!' 
            }],
          })(
            // <Select defaultValue="lucy" onChange={handleChange}>
            <Select defaultValue="buy">
                <Option value="buy">Buy</Option>
                <Option value="sell">Sell</Option>
            </Select>
          )}
        </Form.Item>
    );

    const orderTypeField = () => (
        <Form.Item>
          {getFieldDecorator('orderType', {
            rules: [{ 
                required: true, 
                message: 'Please select order type!' 
            }],
          })(
            // <Select defaultValue="lucy" onChange={handleChange}>
            <Select defaultValue="market">
                <Option value="market">Market</Option>
                <Option value="limit">Limit</Option>
            </Select>
          )}
        </Form.Item>
    );

    const limitField = () => (
        <Form.Item>
          {getFieldDecorator('limit', {
            rules: [{ 
                required: true, 
                message: 'Please provide limit' 
            }],
          })(
            <InputNumber />
          )}
        </Form.Item>
    );

    const quantityField = () => (
        <Form.Item>
          {getFieldDecorator('quantity', {
            rules: [{ 
                required: true, 
                message: 'Please provide limit' 
            }],
          })(
            <InputNumber />
          )}
        </Form.Item>
    );

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        {pairField()}
        {sideField()}
        {orderTypeField()}
        {limitField()}
        {quantityField()}
        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Place order
          </Button>
        </Form.Item>
      </Form>
    );
};

export const OrderFormWrapper = Form.create({ name: 'orderForm' })(OrderForm);