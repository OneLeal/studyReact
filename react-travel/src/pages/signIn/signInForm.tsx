import styles from "./signInForm.module.css";
import React, { useState, useEffect } from "react";
import { Button, Modal, Checkbox, Form, Input } from "antd";
import { signInRequest } from "../../redux/signIn/slice";
import { useAppDispatch, useSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

export const SignInForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.signIn.loading);
  const error = useSelector((state) => state.signIn.error);
  const token = useSelector((state) => state.signIn.token);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    token && navigate("/");
  }, [token]);

  const closeModal = () => {
    setVisible(false);
  };

  const onFinish = (values: any) => {
    const params = { email: values.username, password: values.password };
    dispatch(signInRequest(params));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        className={styles["login-form"]}
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
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
        <p>{error}</p>
      </Modal>
    </div>
  );
};
