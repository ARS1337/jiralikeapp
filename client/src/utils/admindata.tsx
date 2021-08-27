import { NewProjectProps } from "../components/NewProject/NewProject";

const adminDataSource:NewProjectProps['data'][] = [
  {
    name: "project1",
    assignedTo: "abhay",
    comments: [
      { userName: "user1", comment: "dfsgsfdsf" },
      { userName: "user1", comment: "dfsgsfdsf" },
      { userName: "user1", comment: "dfsgsfdsf" },
    ],
    keys: [
      { keyName: "key1", keyValue: "fgdsfdfsfsdfsdsf" },
      { keyName: "key1", keyValue: "fgdsfdfsfsdfsdsf" },
    ],
    attatchments: "dsf",
    progress:82,
  },
  {
    name: "project1",
    assignedTo: "abhay2",
    comments: [
      { userName: "user1", comment: "dfsgsfdsf" },
      { userName: "user1", comment: "dfsgsfdsf" },
      { userName: "user1", comment: "dfsgsfdsf" },
    ],
    keys: [
      { keyName: "key1", keyValue: "fgdsfdfsfsdfsdsf" },
      { keyName: "key1", keyValue: "fgdsfdfsfsdfsdsf" },
    ],
    attatchments: "dsf",
    progress:82,

  },
  {
    name: "project1",
    assignedTo: "abhay3",
    comments: [
      { userName: "user1", comment: "dfsgsfdsf" },
      { userName: "user1", comment: "dfsgsfdsf" },
      {
        userName: "user1",
        comment:
          "fgdsfdfsfsdfsdsffgdsfdfsfsdfsdsffgdsfdfsfsdfsdsffgdsfdfsfsdfsdsffgdsfdfsfsdfsdsf111",
      },
    ],
    keys: [
      {
        keyName: "key1",
        keyValue:
          "fgdsfdfsfsdfsdsffgdsfdfsfsdfsdsffgdsfdfsfsdfsdsffgdsfdfsfsdfsdsffgdsfdfsfsdfsdsf111  ",
      },
      { keyName: "key1", keyValue: "fgdsfdfsfsdfsdsf" },
    ],
    attatchments: "dsf fsdddd",
    progress:82,

  },
];

export { adminDataSource };
