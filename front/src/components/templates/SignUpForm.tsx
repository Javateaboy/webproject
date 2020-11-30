import React, { FC, useState } from 'react';
import 'antd/dist/antd.css';
import { Drawer, Form, Button, Col, Row, Input } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  PlusOutlined,
} from '@ant-design/icons';
import SendButton from '../organisms/SendButton';

// TODO: useMutationが使えない。Hookの構造上考える

const SignUpForm: FC = () => {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  const CheckButton = () => {
    if (username.length < 3 || password.length < 3) {
      return (
        <Button disabled type="primary">
          Submit
        </Button>
      );
    }

    return (
      <SendButton close={onClose} username={username} password={password} />
    );
  };

  return (
    <>
      <Button
        style={{ color: 'white' }}
        size="small"
        type="text"
        onClick={showDrawer}
      >
        <PlusOutlined />
        Sign Up
      </Button>
      <Drawer
        title="アカウント登録"
        width="350"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <CheckButton />
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    min: 3,
                    max: 20,
                    message: '3文字以上20文字以下',
                  },
                ]}
              >
                <Input
                  allowClear
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Please enter user name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    min: 3,
                    max: 20,
                    message: '3文字以上20文字以下',
                  },
                ]}
              >
                <Input.Password
                  allowClear
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="password"
                  iconRender={(v) =>
                    v ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default SignUpForm;