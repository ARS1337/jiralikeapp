import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Space,
} from 'antd';
import SelectMultiple from '../SelectMultiple/';
import { UploadOutlined, InboxOutlined, SaveOutlined } from '@ant-design/icons';
import Upload from 'antd/es/upload/Upload';
import TextArea from 'antd/lib/input/TextArea';

interface NewProjectProps {
    data: {
        name: string,
        assignedTo: string[] | string,
        progress: number,
        comments: { userName: string, comment: string } | { userName: string, comment: string }[],
        keys: { keyName: string, keyValue: string } | { keyName: string, keyValue: string }[],
        attatchments: string
    },
    userList: string[]
}
function NewProject(props: NewProjectProps) {
    console.log(props)
    const { userList, data } = props;
    const [projectName, setProjectName] = useState(data.name || '');
    const [assignedTo, setAssignedTo] = useState(data.assignedTo || []);
    const [progess, setProgress] = useState(data.progress || '');
    const [comments, setComments] = useState(data.comments || []);
    const [keys, setKeys] = useState(data.keys || []);

    return (
        <>
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                }}
            >
                <Form.Item label="Name: ">
                    <Input />
                </Form.Item>
                <Form.Item label="Assigned To">
                    <SelectMultiple userList={userList} setAssignedTo={setAssignedTo} />
                </Form.Item>

                <Form.Item
                    name="upload"
                    label="Attatchments"
                    valuePropName="fileList"
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                {/* <Form.Item label="Dragger">
                    <Form.Item name="dragger" valuePropName="fileList" noStyle>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item> */}

                <Form.Item label="Comments" >
                    <TextArea placeholder="Your Comments..." autoSize />
                </Form.Item>

                <Form.Item label="Keys: ">
                    <Space >
                        <Input placeholder="Key Name" />
                        <Input placeholder="Key Value" />
                    </Space>

                </Form.Item>

                <Form.Item label="" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button icon={<SaveOutlined />} type='primary' >Save</Button>
                </Form.Item>

            </Form>
        </>
    );
}

export type { NewProjectProps };
export default NewProject;