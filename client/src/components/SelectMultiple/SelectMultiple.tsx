import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { Dispatch, SetStateAction } from 'react';
import 'antd/dist/antd.css';

interface Props {
    userList: string[],
    setAssignedTo: Dispatch<SetStateAction<string[] | string>>;
}

function SelectMultiple(props: Props) {
    const { userList } = props;
    return (
        <div>
            <Select mode = "tags" style={{ width: "100%" }} onChange={(value) => console.log(value)} >
                {
                    userList.map((x,key) => {
                        return (
                            <>
                                <Option value={x} key ={key+x}>{x}</Option>
                            </>
                        )
                    })
                }
            </Select>
        </div>
    );
}

export default SelectMultiple;