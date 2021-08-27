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
} from 'antd';
import SelectMultiple from '../SelectMultiple/';

interface NewProjectProps {
    data: {
        name: string,
        assignedTo: string[] | string,
        progress: number,
        comments: { userName: string, comment: string } | { userName: string, comment: string }[],
        keys: { keyName: string, keyValue: string } | { keyName: string, keyValue: string }[],
        attatchments:string
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
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                }}
            >
                <Form.Item label="Input">
                    <Input />
                </Form.Item>
                <Form.Item label="Select">
                    <SelectMultiple userList={userList} setAssignedTo={setAssignedTo} />
                </Form.Item>

                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export type { NewProjectProps };
export default NewProject;