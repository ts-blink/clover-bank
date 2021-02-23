import React from 'react';
import { HashRouter, Link, Routes, Route, useLocation } from 'react-router-dom';
import { PageHeader, Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import './App.css';
import { FeedbackAnalysis } from './components/feedback-analysis/FeedbackAnalysis';
import { Home } from './components/home/Home';
import { Manage } from './components/manage/Manage';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

const PathToKey = {
  '/analyze': '1',
  '/': 'home',
  '/manage': '2',
}


function App() {
  return (
    <HashRouter>
      <AppView />
    </HashRouter>
  )
}

const AppView = () => {
  const location = useLocation();
  console.log(location);
  const [selectedKey, setSelectedKey] = React.useState('home');
  React.useEffect(() => {
    setSelectedKey(PathToKey[location.pathname]);
  }, [location])

  return (
    <div className="App">
      <PageHeader
        title="Clover Bank"
        className="site-page-header"
        ghost={false}
        subTitle="Retail Banking Customer 360"
        avatar={{ src: 'https://media-exp1.licdn.com/dms/image/C4E0BAQGcF6uTtvukQg/company-logo_200_200/0/1587155976524?e=2159024400&v=beta&t=m_j79x6LK1NZQo7Mdq1fE14d76fevkn_x_P4S32N0a8' }}
      ></PageHeader>
      <Layout style={{ flex: 1 }}>
        <Sider width={250}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            selectedKeys={[selectedKey]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
            onClick={(e) => setSelectedKey(e.key as string)}
          >
            <Menu.Item key="home" icon={<UserOutlined />} title="Home">
              <Link to="/">Home</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User Accounts">
              <Menu.Item key="1">
                <Link to="/analyze">Feedback Analysis</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/manage">Account Management</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Operations">
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Announcements">
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/analyze" element={<FeedbackAnalysis />}></Route>
            <Route path="/manage" element={<Manage />}></Route>
          </Routes>
        </Content>
      </Layout>


    </div>
  );
}

export default App;
