import './App.css';
import 'antd/dist/antd.css';
import LoginForm from './components/LoginForm/';
import { Card, Col, Layout, Row } from 'antd';
import ProjectList from './components/ProjectPage';
import { Button } from 'antd/lib/radio';
import { useState } from 'react';
import users from './utils/users';

const { Header, Footer, Content } = Layout;

function App() {
  const [userType, setUserType] = useState('admin');
  return (
    <div className="App" style={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Layout>
        <Row style={{ backgroundColor: '#d9dce6' }}>
          <Col md={24}>
            <Header style={{ backgroundColor: '#d9dce6' ,fontFamily:'cursive' }}><h1>Jeera</h1>
            </Header>
          </Col>
        </Row>

        <Content>
          <Row>
            <Col xs={24} sm={24} lg={{ span: 20, offset: 2 }} >
                <LoginForm />
              {/* <ProjectList userType={userType} users={users} /> */}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div >
  );
}

export default App;
