import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox, Radio } from "antd";
import request from "../../utils/request";
import ReactJson from "react-json-view";

function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [process, setProcess] = useState("Login");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  const onFinish = (values: any) => {
    console.log("Success:", values);
    console.log("submit called");
    request("/Login", "POST", { name: name, pwd: password, process: process })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r.success === true) {
          setError(false);
        } else {
          setError(true);
          setErrorMessage(r.errors);
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",
          flex: 1,
          marginTop: 16,
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item name="radio-group" label="">
            <Radio.Group
              onChange={(e) => {
                setProcess(e.target.value);
              }}
              defaultValue={process}
              value={process}
              optionType="button"
              buttonStyle="solid"
              options={[
                { label: "Login", value: "Login" },
                { label: "Sign Up", value: "Sign Up" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          textAlign:'left'
        }}
      >
        {error ? (
          <ReactJson
            src={errorMessage}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          />
        ) : null}
      </div>
    </>
  );
}

export default LoginForm;
