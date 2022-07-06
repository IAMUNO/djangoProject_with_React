import React, { useState } from "react";
import { axiosInstance } from "api";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { setToken } from "store";
import { useAppContext } from 'store';
import { parseErrorMessages } from "utils/forms";


export default function Login() {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [fieldErrors, setFieldErrors] = useState({});

    const { from : loginRedirectUrl } = location.state || { from: { pathname: "/" }};

    const handleSignUp = () => {
        navigate("/accounts/signup");
    };

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;
            setFieldErrors({});
            const data = { username, password };

            try {
                const response = await axiosInstance.post("/accounts/token/", data);
                const { data: { access: accessToken } } = response;
//                console.log(">>> Bearer/accessToken :  ", accessToken );
                dispatch(setToken(accessToken));

                notification.open({
                    message: "You have logged in successfully!! ",
                    description: "Now enjoy your Instagram! ",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });

                navigate(loginRedirectUrl) ;
            }
            catch (error) {
                if ( error.response ) {
                    notification.open({
                        message: "You failed to login your account! ",
                        description: "Please check your ID/Password again! ",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    });

                    const { data : fieldsErrorMessages } = error.response;
                    // fieldsErrorMessages => { username: "m1 m2", password: [] }
                    // python: mydict.items()

                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
        fn();
    };

    return (
        <Card title="Login">
            <Form {...layout} onFinish={onFinish} autoComplete={"false"} >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input your username!' },
                        { min: 5, message: "more than 5 letters!"}
                    ]}
                    hasFeedback
                    {...fieldErrors.username}
                    {...fieldErrors.non_field_errors}
                >
                    <Input placeholder="Username"/>

                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    {...fieldErrors.password}
                >
                    <Input.Password  placeholder="Password"/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                    <Button htmlType="button" onClick={handleSignUp} style={{"margin-left": "1rem"}}>
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </Card>
   );
}

const layout = {
    labelCol : { span: 8 },
    wrapperCol : { span: 8 }
};

const tailLayout = {
    wrapperCol : { offset: 10, span: 20 }
};


