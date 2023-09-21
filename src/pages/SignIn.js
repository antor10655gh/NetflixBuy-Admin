import React from 'react';
import logo from '../assets/images/logo.png';
import { Button, Col, Form, Input, Layout, Row, Switch, Typography, message } from 'antd';
import { toast } from 'react-toastify';
const { Title } = Typography;
const {Content } = Layout;


const SignIn = () => {

  const [checked, setChecked] = React.useState(true);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setChecked(checked);
  }
  
  const onFinish = (values) =>{
    values.remember = checked;
    if(values){
      fetch('https://chat.linkfy.org/api/v1/admin/login', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if(data.message === 'Login successful'){
          toast.success('🎉 Wow Login Success!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            localStorage.setItem('token', JSON.stringify(data.token));
            window.location.href = '/';
          }, 1200);
          
        } else{
          toast.error('🚨 Admin Not Found!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        }
      })
      // localStorage.setItem('user', JSON.stringify(values));
      
    }else{
      message.error('Please fill all fields');
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  return (
    <>
      <>
        <Layout className="layout-default layout-signin" style={{minHeight: '100vh', position: 'relative',}}>
          <Content className="signin">
            <Row gutter={[24, 0]}>
                <Col
                  className="singin-container"
                  style={{
                    top: '50%', 
                    left: '50%', 
                    width: '100%', 
                    padding: '20px 40px', 
                    position: 'absolute' , 
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                  }}
                  xs={{ span: 24, offset: 0 }}
                  lg={{ span: 6, offset: 0 }}
                  md={{ span: 24 }}
                >
                  <div style={{ textAlign: 'center', margin: '10px 0' }}>
                    <img width='150px' src={logo} alt="logo.png" />
                  </div>
                  <Title className="font-regular text-muted text-center mb-4" level={5}>
                    Enter your email and password to sign in
                  </Title>
                  <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    className="row-col"
                  >
                    <Form.Item
                      className="username"
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                      className="username"
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                      name="remember"
                      className="aligin-center"
                      valuePropName="checked"
                    >
                      <Switch defaultChecked onChange={onChange} />
                      Remember me
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                      >
                        SIGN IN
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
            </Row>
          </Content>
        </Layout>
      </>
    </>
  );
};

export default SignIn;
