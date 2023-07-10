import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchShelters } from "../store/shelters";
import { reduxForm } from "redux-form";
import MemoizedField from "./MemoizedField";
import {
  Button,
  Radio,
  Select,
  InputNumber,
  Space,
  Alert,
  Form,
  ConfigProvider,
} from "antd";
import { WalletOutlined, HomeOutlined } from "@ant-design/icons";
import { actions } from "../store/stepper";

const FormItem = Form.Item;
const REDUX_FORM_NAME = "Step1Form";

function Step1(props) {
  const { nextStep } = actions;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const shelters = useSelector((state) => state.shelters.entities);
  const loading = useSelector((state) => state.shelters.loading);
  const error = useSelector((state) => state.shelters.error);

  const initialValues = useSelector(
    (state) => state.form?.[REDUX_FORM_NAME]?.values
  );

  const donationType = useSelector(
    (state) => state.form[REDUX_FORM_NAME]?.values?.donationType
  );

  useEffect(() => {
    dispatch(fetchShelters());
  }, [dispatch]);

  if (error) {
    return <Alert message="Error" description={error.message} type="error" />;
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Hind, Public Sans",
        },
      }}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={() => {
          dispatch(nextStep());
        }}
      >
        <div>
          <h1>Vyberte si možnosť, ako chcete pomôcť</h1>
          <Space>
            <MemoizedField
              name="donationType"
              component={({ input, meta, ...rest }) => (
                <FormItem
                  name="donationType"
                  rules={[
                    {
                      required: true,
                      message: "Vyberte prosím formu donácie.",
                    },
                  ]}
                >
                  <Radio.Group {...input} {...rest} optionType="button">
                    <Space>
                      <Radio
                        shape="round"
                        className="chooseDonateTypeButton"
                        value="single-shelter"
                        buttonStyle="solid"
                      >
                        <WalletOutlined className="shelterSelectIcon" />
                        <p className="shelterSelect">
                          Chcem finančne prispieť konkrétnemu útulku
                        </p>
                      </Radio>
                      <Radio
                        shape="round"
                        className="chooseDonateTypeButton"
                        value="all-shelters"
                        buttonStyle="solid"
                      >
                        <HomeOutlined className="shelterSelectIcon" />
                        <p className="shelterSelect">
                          Chcem finančne prispieť celej nadácií
                        </p>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </FormItem>
              )}
            />
          </Space>
          <div className="selector">
            <h2> Útulok </h2>
            {donationType !== "single-shelter" && (
              <h3 className="headerNotRequired">Nepovinné</h3>
            )}
          </div>
          <MemoizedField
            name="shelterId"
            component={({ input, meta, ...rest }) => (
              <FormItem
                name="shelterId"
                rules={[
                  {
                    required: donationType === "single-shelter",
                    message: "Vyberte prosím útulok zo zoznamu.",
                  },
                ]}
              >
                <Select
                  className="shelterSelect"
                  placeholder="Vyberte prosím útulok zo zoznamu."
                  style={{ width: 625 }}
                  options={shelters?.map?.(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))}
                  loading={loading}
                  {...input}
                  {...rest}
                />
              </FormItem>
            )}
          />
          <h2> Suma, ktorou chcem prispieť </h2>
          <div style={{ width: 625, display: "inline-flex" }}>
            <MemoizedField
              name="donationAmountPredefined"
              component={({ input, meta, ...rest }) => (
                <FormItem
                  name="donationAmountPredefined"
                  rules={[
                    {
                      required: true,
                      message: "Vyberte alebo zadajte prosím sumu donácie.",
                    },
                  ]}
                >
                  <Radio.Group
                    {...input}
                    {...rest}
                    size="large"
                    buttonStyle="solid"
                  >
                    <Radio.Button value={5} className="donateButton">
                      5€
                    </Radio.Button>
                    <Radio.Button value={10} className="donateButton">
                      10€
                    </Radio.Button>
                    <Radio.Button value={20} className="donateButton">
                      20€
                    </Radio.Button>
                    <Radio.Button value={30} className="donateButton">
                      30€
                    </Radio.Button>
                    <Radio.Button value={50} className="donateButton">
                      50€
                    </Radio.Button>
                    <Radio.Button value={100} className="donateButton">
                      100€
                    </Radio.Button>
                  </Radio.Group>
                </FormItem>
              )}
            />
            <MemoizedField
              name="donationAmountCustom"
              component={({ input, meta, ...rest }) => {
                return (
                  <FormItem name="donationAmountCustom">
                    <InputNumber
                      style={{ width: "120px" }}
                      addonAfter="€"
                      size="large"
                      {...input}
                      {...rest}
                    />
                  </FormItem>
                );
              }}
            />
          </div>
          <div style={{ float: "right" }}>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                className="button-next"
                style={{
                  color: "white",
                  background: "#CD8A64",
                  height: "59px",
                  fontSize: "14px",
                  fontWeight: "800",
                }}
                size="large"
              >
                Pokračovať
              </Button>
            </FormItem>
          </div>
        </div>
      </Form>
    </ConfigProvider>
  );
}
export default reduxForm({
  form: REDUX_FORM_NAME,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
})(Step1);
