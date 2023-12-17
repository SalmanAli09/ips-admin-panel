import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, notification } from 'antd';
import Score from '../Scoreboard/Score';
import Upload from '../UploadResult/Upload';
import { useNavigate } from 'react-router-dom'
import '../../firebase';
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
const { Header, Sider, Content } = Layout;


const Dashboard = () => {
  const Navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const [firstScreen, setFScreen] = useState(true);
  const [SecondScreen, setSScreen] = useState(!true);
  const [thirdScreen, setTScreen] = useState(!true);

  const data = [
    {
      "rowData": [
        {
          "section": "D",
          "islamiyat": "87",
          "percentage": "71.63%",
          "sindhi": "55",
          "english": "78",
          "quranMajeed": "45",
          "gk": "66",
          "rollNo": "234",
          "urdu": "77",
          "name": "salman",
          "total": "573",
          "maths": "88",
          "obtained": "675",
          "science": "77",
          "fatherName": "Ali",
          "grade": "C",
          "class": "6"
        }
      ]
    }
  ];


  const [storedValues, setStoredValues] = useState(data);

  const db = getFirestore();



  const fetchDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "myCollection"));
    const temporaryArr = [];
    querySnapshot.forEach((doc) => {
      temporaryArr.push(doc.data());
    });
    console.log(temporaryArr?.rowData)
    setStoredValues(temporaryArr?.rowData);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleItemClick = (key) => {
    if (key === '1') {
      setFScreen(true)
      setSScreen(!true)
      setTScreen(!true)
    }
    if (key === '2') {
      setFScreen(!true)
      setSScreen(true)
      setTScreen(!true)
    }
    if (key === '3') {
      setFScreen(!true)
      setSScreen(!true)
      setTScreen(true)
      notification.info({
        message: "Comming Soon...",
      });
    }
  };
  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      Navigate('/dashboard')
    } else {
      Navigate('/')
    }
  }, [])
  const logout = () => {
    Navigate("/")
    localStorage.clear();
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{
          backgroundColor: "white",
          // opacity: "0.9",
          height: "70px",
          width: "95%",
          margin: "0px auto"
        }}
          className='my-2 rounded d-flex justify-content-center align-items-center fs-6'>
          <img src="https://guileless-cat-a0cd77.netlify.app/img/school.png" style={{ width: "70px" }} alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => handleItemClick(key)}
          items={[
            {
              key: '1',
              icon: <UploadOutlined />,
              label: 'Upload Result',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'View Result',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'Comming Soon!',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >

          <span className='fs-4 fw-bolder d-flex align-items-center' style={{ width: "100%" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            Welcome Admin
            <span className='text-end fs-5 text-danger' style={{ position: "relative", left: "1020px", cursor: "pointer" }} onClick={logout}>Logout</span>
          </span>
        </Header>
        {firstScreen && (
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Upload />
          </Content>
        )}
        {SecondScreen && (
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Comming soon....
          </Content>
        )}
        {thirdScreen && (
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '100vh',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div>
              <p>Comming Soon....</p>
            </div>


          </Content>
        )}
      </Layout>
    </Layout>
  );
};
export default Dashboard;