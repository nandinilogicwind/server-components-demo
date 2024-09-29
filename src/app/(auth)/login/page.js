"use client";

import { useContext } from "react";
import { AppContext } from "../../../../AppContext";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { LOGIN } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";

function Login() {
  const { initializeAuth } = useContext(AppContext);
  const [form] = Form?.useForm();
  const router = useRouter();

  const successCallback = (accessToken, userData) => {
    initializeAuth(accessToken, userData);
    router?.push("/");
  };

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: ({ emailPasswordLogIn: { data } }) => {
      const accessToken = data?.token || null;
      if (successCallback) {
        successCallback(accessToken, data?.user);
      }
    },
    onError() {},
  });

  const handleFinish = async (formValues) => {
    login({
      variables: { data: { ...formValues } },
    });
  };

  return (
    <div>
      <div
        style={{
          background: "wheat",
          borderRadius: "12px",
          padding: "32px",
          margin: "auto",
          width: "500px",
          marginTop: "5%",
          color: "black",
        }}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "18px",
          }}
        >
          Please Login!
        </h1>
        <Form
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email ID"
            name="email"
            rules={[
              {
                required: true,
                message: "Email ID is required",
              },
            ]}
          >
            <Input placeholder="Enter your email ID here" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password
              style={{ height: "34px" }}
              placeholder="Enter your password here"
            />
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="primary"
              style={{
                background: "black",
                height: "34px",
                fontWeight: "500",
                fontSize: "16px",
              }}
              htmlType="submit"
              loading={loading}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
