import React, { useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import { Button, Form, Input, Select, InputNumber } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { actions } from "../store/stepper";
import MemoizedField from "./MemoizedField";

const REDUX_FORM_NAME = "Step2Form";

function Step2() {
  const { nextStep, previousStep } = actions;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const initialValues = useSelector(
    (state) => state.form?.[REDUX_FORM_NAME]?.values
  );

  return (
    <div>
      <h1>Potrebujeme od Vás zopár informácií</h1>
      <h3> O Vás </h3>

      <Form
        form={form}
        initialValues={initialValues}
        onFinish={() => {
          dispatch(nextStep());
        }}
      >
        <h3> Meno </h3>
        <MemoizedField
          name="firstName"
          component={({ input, meta, ...rest }) => (
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Prosím zadajte svoje meno.",
                  whitespace: true,
                },
              ]}
            >
              <Input
                {...input}
                {...rest}
                minLength={2}
                maxLength={30}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Zadajte Vaše meno"
              />
            </Form.Item>
          )}
        />
        <h3> Priezvisko </h3>

        <MemoizedField
          name="lastName"
          component={({ input, meta, ...rest }) => (
            <Form.Item
              name={"lastName"}
              rules={[
                {
                  required: true,
                  message: "Prosím zadajte svoje priezvisko.",
                  whitespace: true,
                },
              ]}
            >
              <Input
                {...input}
                {...rest}
                minLength={2}
                maxLength={30}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Zadajte Vaše priezvisko"
              />
            </Form.Item>
          )}
        />
        <h3> E-mailová adresa </h3>

        <MemoizedField
          name="email"
          component={({ input, meta, ...rest }) => (
            <Form.Item
              name={"email"}
              rules={[
                {
                  required: true,
                  type: "email",
                  message:
                    "Prosím zadajte e-mailovú adresu v správnom formáte.",
                },
              ]}
            >
              <Input
                maxLength={40}
                {...input}
                {...rest}
                type="email"
                prefix={<MailOutlined />}
                placeholder="Zadajte Váš e-mail"
              />
            </Form.Item>
          )}
        />
        <h3> Tel. číslo </h3>
        <MemoizedField
          name="phone"
          component={({ input, meta, ...rest }) => {
            return (
              <Form.Item
                name="phone"
                width={"100%"}
                rules={[
                  {
                    required: true,
                    message: "Prosím zadajte tel. číslo. ",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  width={100}
                  prefix={<PhoneOutlined />}
                  placeholder="+421"
                  minLength={12}
                  maxLength={12}
                  {...input}
                  {...rest}
                />
              </Form.Item>
            );
          }}
        />

        <Form.Item>
          <div style={{ float: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              className="button-next"
              style={{
                color: "white",
                background: "#CD8A64",
                height: "59px",
                fontSize: "14px",
                fontWeight: "800",
                fontFamily: "Public Sans",
              }}
            >
              Pokračovať
            </Button>
          </div>

          <div>
            <Button
              type="primary"
              onClick={() => dispatch(previousStep())}
              shape="round"
              style={{
                color: "black",
                background: "#F3E2D9",
                height: "59px",
                width: "120px",
                fontSize: "14px",
                fontWeight: "800",
                fontFamily: "Public Sans",
              }}
              size="large"
            >
              Späť
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}

export default reduxForm({
  form: REDUX_FORM_NAME,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
})(Step2);
