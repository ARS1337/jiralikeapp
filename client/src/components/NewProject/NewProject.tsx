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
import { UploadProps } from 'antd/es/upload/Upload';


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

    const uploadProps: UploadProps = {
        action: "http://localhost:3001/upload",
        name: 'sampleFile',
        defaultFileList: [
        ],
        // onChange({ file, fileList }) {
        //   if (file.status !== "uploading") {
        //     console.log(file, fileList);
        //   }
        //   file.url = "http://localhost:3001/" + file.name;
        //   //download the file as follows: get a event from the client to download the file, download the file temporarily and send that file after getting the confirmation 
        //   // of download, delte that file from temp location
        // },
        // onDownload(file) {
        //   console.log("ondownload clicked", file)
        // },
        // onRemove(file) {
        //   console.log("onremove", file)
        //   //call server to remove the file from hosting
        // }
    };

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
                onSubmitCapture={(e) => { e.preventDefault() }}
            >
                <Form.Item label="Name: ">
                    <Input />
                </Form.Item>
                <Form.Item label="Assigned To">
                    <SelectMultiple userList={userList} setAssignedTo={setAssignedTo} />
                </Form.Item>
                {/* 
                <Form.Item
                    name="upload"
                    label="Attatchments"
                    valuePropName="fileList"
                >
                    <Upload  {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item> */}

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
                    <TextArea placeholder="Your Comments..." autoSize style={{ marginBottom: '14px' }} />
                    <Button type="primary">Add Comment</Button>
                </Form.Item>

                <Form.Item label="Keys: ">
                    <Space >
                        <Input placeholder="Key Name" />
                        <Input placeholder="Key Value" />
                        <Button type="primary">Add</Button>
                    </Space>
                    {//map and show all the keys here
                    }
                </Form.Item>

                <Form.Item label="" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button icon={<SaveOutlined />} type='primary' onSubmit={(e) => { e.preventDefault(); console.log('submit called') }}>Save</Button>
                </Form.Item>

            </Form>
        </>
    );
}

export type { NewProjectProps };
export default NewProject;