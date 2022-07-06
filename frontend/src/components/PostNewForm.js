import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {  Form, Input, Button, Upload, Modal, notification } from "antd";
import { FrownOutlined, PlusOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "utils/base64";
import { axiosInstance } from "api";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/forms";


export default function PostNewForm() {
    const navigate = useNavigate();
    const { store: { Token } } = useAppContext();
    const [fileList, setFileList] = useState([]);
    const [fieldErrors, setFieldErrors] = useState({});
    const [previewPhoto, setPreviewPhoto] = useState({
        visible: false,
        base64: null
    });

    const handleUploadChange = ({fileList}) => {
        setFileList(fileList);
    };

    const handlePreviewPhoto = async file => {
        if ( !file.url && !file.preview ) {
            file.preview = await getBase64FromFile(file.originFileObj);
        }
        setPreviewPhoto({
            visible: true,
            base64: file.url || file.preview
        });
    };

    const handleFinish = async fieldValues => {
        const { caption, location, photo:{fileList} } = fieldValues;

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("location", location);

        fileList.forEach(file => {
            formData.append("photo", file.originFileObj);
        });

        const headers ={ Authorization: `Bearer ${Token}` };
        try {
            const response = await axiosInstance.post("/api/posts/", formData, { headers });
            console.log("success response : ", response);
            navigate("/");
        }

        catch(error) {
            if ( error.response ) {
                const { status, data: fieldsErrorMessages } = error.response;
                if ( typeof fieldsErrorMessages === "string" ) {
                    notification.open({
                        message: "Server Error",
                        description: `${status} server error. Please check your server.`,
                        icon: <FrownOutlined style={{ color: "#ff3333" }} />
                    });
                }
                else {
                    setFieldErrors(parseErrorMessages(fieldsErrorMessages));
                }
            }
        }
    };

    return (
        <div>
            <Form {...layout} onFinish={handleFinish} autoComplete={"false"} >
                <Form.Item
                    label="Caption" name="caption"
                    rules={[
                        { required: true, message: 'Please input Caption!!!' }
                    ]}
                    hasFeedback
                    {...fieldErrors.caption}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Location" name="location"
                    rules={[
                        { required: true, message: 'Please input Location!!!' }
                    ]}
                    hasFeedback
                    {...fieldErrors.location}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Photo" name="photo"
                    rules={[
                        { required: true, message: "You need to upload pictures!!!" },
                    ]}
                    hasFeedback
                    {...fieldErrors.photo}
                >
                    <Upload listType="picture-card" fileList={fileList}
                        beforeUpload={() => {
                            return false;
                        }}
                        onChange={handleUploadChange}
                        onPreview={handlePreviewPhoto}
                    >
                        { fileList.length > 0 ? null : (
                            <div>
                                <PlusOutlined />
                                <div className="ant-upload-text">
                                    Upload
                                </div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

                <Modal visible={previewPhoto.visible} footer={null}
                    onCancel={() => setPreviewPhoto({ visible: false })}
                >
                    <img src={previewPhoto.base64} style={{ width:"100%" }} alt="Preview"/>
                </Modal>
                <hr/>
            </Form>
        </div>
    );
}


const layout = {
    labelCol : { span: 8 },
    wrapperCol : { span: 8 }
};

const tailLayout = {
    wrapperCol : { offset: 11, span: 20 }
};
