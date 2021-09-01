import React from "react";
// import { Table } from "antd";
// import { userColumns } from "../../utils/tableStructure";
// import { userDataSource } from "../../utils/userData";
// import { adminDataSource } from "../../utils/admindata";
import UserTable from "../UserTable";
import AdminTable from "../AdminTable";

function ProjectList(props: { userType: string; users: string[] }) {
  const { userType, users } = props;
  return (
    <div style={{ marginTop: 16, fontFamily:'cursive' }}>
      {userType === "admin" ? <AdminTable userList={users}/> : <UserTable />}
    </div>
  );
}

export default ProjectList;
