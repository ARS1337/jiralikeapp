import './App.css';
import 'antd/dist/antd.css';
import LoginForm from './components/LoginForm/';
import { Col, Layout, Row } from 'antd';
import ProjectList from './components/ProjectPage';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App" style={{height:'100vh', backgroundColor:'#f0f2f5'}}>
      <Layout>
        <Header style={{backgroundColor:'#d9dce6'}}>Jeera</Header>
        <Content>
          <Row>
            <Col xs={24} sm={24} lg={{span:20,offset:2}} >
              {/* <LoginForm /> */}
              <ProjectList userType="admin" users={[]}/>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
