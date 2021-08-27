/* eslint-disable react/no-multi-comp */
import { Anchor, Button, Progress, Table } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { HighlightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { userDataSource } from "../../utils/userData";
import { UploadProps } from 'antd/es/upload/Upload';
const { Paragraph } = Typography;

function UserTable() {
  const props: UploadProps = {
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

  const userColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress:number) => {
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
            {comments.map((x: { userName: string; comment: string }) => {
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
        return keys.map((x: { keyName: string; keyValue: string }) => {
          console.log(x);
          return (
            <>
              <Paragraph
                style={{ wordBreak: "break-word" }}
              >
                {x.keyName} : {x.keyValue}
              </Paragraph>
            </>
          );
        });
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
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </>
        );
      },
    },
    {
      title: 'User',
      key: 'userAction',
      render: (text: unknown, record: {}) => {
        return (
          <>
            <Button type="link">Add comments</Button>
          </>
        )
      }
    },
  ];

  return (
    <div>
      <Table columns={userColumns} dataSource={userDataSource} />
    </div>
  );
}

export default UserTable;
