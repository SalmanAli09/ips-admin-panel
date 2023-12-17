import React, { useState } from 'react';
import { Button, notification, Space } from 'antd';
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/navbar';

function AuthPage() {
    const Navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const login = () => {
        console.log(data?.username);
        console.log(data?.password);
        if (data?.username !== "admin@gmail.com" && data?.password !== "12345678") {
            notification.error({
                message: "Invalid Username or Password!",
            });
        } else {
            localStorage.setItem("token", "login")
            notification.success({
                message: "Welcome Admin!",
            });
            const token = localStorage.getItem("token")
            if (token) {
                Navigate('/dashboard')
            } else {
                Navigate('/')
            }
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

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row" style={{ marginTop: "150px" }}>
                    <div className="col-lg-4 col-md-4 col-sm-12  mx-auto">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                onChange={(e) => setData({ ...data, username: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                        </div>
                        <button style={{ width: "100%" }} className="btn btn-primary" onClick={login}>Login as admin</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthPage;
