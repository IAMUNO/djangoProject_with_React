import React, { useState } from "react";
import { axiosInstance } from "api";
import { useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";


export default function Signup() {
    const navigate = useNavigate();
    const [fieldErrors, setFieldErrors] = useState({});

    const onFinish = values => {
        async function fn() {
            const { username, password } = values;

            setFieldErrors({});

            const data = { username, password };
            try {
                await axiosInstance.post("/accounts/signup/", data);

                notification.open({
                    message: "Your account has been created! ",
                    description: "Now we are going to Login page! ",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />
                });
                navigate("/accounts/login");
            }
            catch (error) {
                if ( error.response ) {
                    notification.open({
                        message: "You failed to create your account! ",
                        description: "Please check your ID/Password again! ",
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    });

                    const { data : fieldsErrorMessages } = error.response;
                    // fieldsErrorMessages => { username: "m1 m2", password: [] }
                    // python: mydict.items()
                    setFieldErrors(
                        Object.entries(fieldsErrorMessages).reduce(
                            (acc, [fieldName, errors]) => {
                                // errors: ["m1", "m2"].join(" ") => "m1 m2"
                                acc[fieldName] = {
                                    validateStatus: "error",
                                    help: errors.join(" ")
                            }
                            return acc;
                            }, {}
                        )
                    );
                }
            }
        }
        fn();
    };

    return (
        <Card title="Signup">
        <Form {...layout} onFinish={onFinish} autoComplete={"false"} >
            <Form.Item
                label="Username" name="username"
                rules={[
                    { required: true, message: 'Please input your username!' },
                    { min: 5, message: "more than 5 letters!"}
                ]}
                hasFeedback
                {...fieldErrors.username}
            >
                <Input placeholder="Username"/>
            </Form.Item>

            <Form.Item
                label="Password" name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                {...fieldErrors.password}
            >
                <Input.Password placeholder="Password"/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
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
    wrapperCol : { offset: 11, span: 20 }
};