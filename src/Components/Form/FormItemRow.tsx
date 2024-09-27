import styled from '@emotion/styled';
import { Col, Form, Input, Row, Select, SelectProps } from 'antd';
import { Rule } from 'antd/es/form';

const fontWeightStyle = { fontWeight: 700 };

interface FormItemRowPropsType {
  icon: JSX.Element;
  label: string;
  formItemName: string;
  formItemRules?: Rule[];
  selectProps?: SelectProps;
}

export const FormItemRow = (props: FormItemRowPropsType) => {
  const { icon, label, selectProps, formItemName, formItemRules } = props;

  return (
    <Row>
      <Col span={8}>
        <CardContentLabel>
          {icon}
          &nbsp;&nbsp;{label}:
        </CardContentLabel>
      </Col>
      <Col span={16}>
        <Form.Item name={formItemName} rules={formItemRules}>
          {selectProps ? (
            <Select
              {...selectProps}
              style={{ marginBottom: 0 }}
              labelRender={(label) => (
                <div style={fontWeightStyle}>{label.label}</div>
              )}
              optionRender={(option) => (
                <div style={fontWeightStyle}>{option.label}</div>
              )}
            />
          ) : (
            <Input style={fontWeightStyle} />
          )}
        </Form.Item>
      </Col>
    </Row>
  );
};

const CardContentLabel = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin-top: 3px;
`;
