import React, { useState } from "react";
import axios from "axios";
import styles from "./registerForm.module.css";
import { register } from "../../api";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Modal } from "antd";

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const body = {
      email: values.username,
      password: values.password,
      confirmPassword: values.confirm,
    };

    try {
      await axios.post(register, body);
      navigate("/signIn/");
    } catch (error) {
      setErrorMsg("注册失败！");
      setVisible(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    setErrorMsg("注册失败！");
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div>
      <Form
        className={styles["register-form"]}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          hasFeedback
          label="Confirm Password"
          name="confirm"
          rules={[
            { required: true, message: "Please input your confirm password!" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || value === getFieldValue("password")) {
                  return Promise.resolve();
                }
                return Promise.reject("密码确认不一致");
              },
            }),
          ]}
        >
          <Input.Password />
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

      <Modal
        title="提 示"
        open={visible}
        onOk={closeModal}
        onCancel={closeModal}
        cancelText={"取 消"}
        okText={"确 定"}
        maskClosable={false}
      >
        <p>{errorMsg}</p>
      </Modal>
    </div>
  );
};
