import { Anchor, Button, Progress } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  HighlightOutlined,
  SmileOutlined,
  SmileFilled,
} from "@ant-design/icons";
import { Typography } from "antd";
const { Paragraph } = Typography;

const { Link } = Anchor;

const props = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: "1",
      name: "xxx.png",
      status: "done",
      response: "Server Error 500", // custom error message to show
      url: "http://www.baidu.com/xxx.png",
    },
    {
      uid: "2",
      name: "yyy.png",
      status: "done",
      url: "http://www.baidu.com/yyy.png",
    },
    {
      uid: "3",
      name: "zzz.png",
      status: "error",
      response: "Server Error 500", // custom error message to show
      url: "http://www.baidu.com/zzz.png",
    },
  ],
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
    render: () => {
      return (
        <>
          <Progress
            type="circle"
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            percent={88}
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
    render: (comments) => {
      return comments.map((x) => {
        return (
          <>
            <Paragraph
              editable={{
                icon: <HighlightOutlined />,
                tooltip: "click to edit ",
              }}
              style={{ wordBreak: "break-word" }}
            >
              {x.userName} : {x.comment}
            </Paragraph>
            <br />
          </>
        );
      });
    },
  },
  {
    title: "Keys",
    dataIndex: "keys",
    key: "keys",
    render: (keys) => {
      return keys.map((x) => {
        console.log(x);
        return (
          <>
            <Paragraph
              editable={{
                icon: <HighlightOutlined />,
                tooltip: "click to edit ",
              }}
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
];

export { userColumns };
