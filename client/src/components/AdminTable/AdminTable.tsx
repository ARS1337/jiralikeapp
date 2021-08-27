/* eslint-disable react/no-multi-comp */
import { Button, Progress, Table } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { adminDataSource } from "../../utils/admindata";
import NewProject from "../NewProject";
import { NewProjectProps } from "../NewProject/NewProject";
import { UploadProps } from 'antd/es/upload/Upload';
import { Modal } from "antd";
import { useState } from "react";
const { Paragraph } = Typography;

function AdminTable(props: { userList: string[] }) {
  const { userList } = props;
  const [assignedTo, setAssignedTo] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [currSelectedRecord, setCurrSelectedRecord] = useState(adminDataSource[0])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const uploadProps: UploadProps = {
    action: "http://localhost:3001/upload",
    name: 'sampleFile',
    defaultFileList: [
    ],
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
      file.url = "http://localhost:3001/" + file.name;
      //download the file as follows: get a event from the client to download the file, download the file temporarily and send that file after getting the confirmation 
      // of download, delte that file from temp location
    },
    onDownload(file) {
      console.log("ondownload clicked", file)
    },
    onRemove(file) {
      console.log("onremove", file)
      //call server to remove the file from hosting
    }
  };

  const adminColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress: number) => {
        return (
          <>
            <Progress
              type="circle"
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              percent={progress}
              width={44}
            />
          </>
        );
      },
    },
    {
      title: "Assigned To ",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      render: (comments: []) => {

        return (
          <>
            {comments.map((x: { userName: number; comment: string }) => {
              return (
                <>
                  <Paragraph
                    style={{ wordBreak: "break-word" }}
                  >
                    {x.userName} : {x.comment}
                  </Paragraph>
                  <br />
                </>
              );
            }
            )}
          </>)

      },
    },
    {
      title: "Keys",
      dataIndex: "keys",
      key: "keys",
      render: (keys: []) => {
        return (
          <>
            {keys.map((x: { keyName: string; keyValue: string }) => {
              return (
                <>
                  <Paragraph
                    style={{ wordBreak: "break-word" }}
                  >
                    {x.keyName} : {x.keyValue}
                  </Paragraph>
                </>
              );
            })}
          </>)


      },
    },
    {
      title: "Attachments", //attatchments will have a link to attachments and a button to upload attatchments and other important files.
      dataIndex: "attachments",
      key: "attachments",
      // eslint-disable-next-line react/no-multi-comp
      render: () => {
        return (
          <>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </>
        );
      },
    },
    {
      title: 'admin',
      key: 'admin',
      render: (text: unknown, record: NewProjectProps['data']) => {
        return (
          <>
            <Button type="link">Add Keys</Button>
            <Button type="link">Add Comments</Button>
            <Button type="link" onClick={() => {
              setCurrSelectedRecord(record);
              setIsModalVisible(true);
            }}>Edit Project</Button>
            <Button type="link">Delete Project</Button>
            <Button type="link">Assign Users</Button>
          </>
        )
      }
    }
  ];

  return (
    <div>
      <Table columns={adminColumns} dataSource={adminDataSource} />
      <Modal title="Project" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <NewProject data={currSelectedRecord} userList={userList} />
      </Modal>
    </div>
  );
}

export default AdminTable;
