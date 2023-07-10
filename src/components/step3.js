import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/stepper";
import { Button, Form, Checkbox } from "antd";

function App() {
  const dispatch = useDispatch();
  const { previousStep } = actions;
  const shelters = useSelector((state) => state.shelters.entities);
  const formValues = useSelector((state) => {
    return {
      step1: state.form?.Step1Form?.values,
      step2: state.form?.Step2Form?.values,
    };
  });

  function getDonationType(formValues) {
    if (formValues.step1.donationType === "single-shelter") {
      return <p> Chcem finančne prispieť konkrétnemu útulku </p>;
    } else {
      return <p> Chcem finančne prispieť celej nadácii </p>;
    }
  }

  function getShelterName(formValues) {
    if (formValues.step1.shelterId) {
      return <h3> Najviac mi záléží na útulku </h3>;
    } else {
      return <></>;
    }
  }

  return (
    <div>
      <h1>Skontrolujte si zadané informácie</h1>
      <Form>
        <h3 className="finalHeader"> Akou formou chcem pomocť </h3>
        <p className="finalParagraph"> {getDonationType(formValues)} </p>

        <h3 className="finalHeader"> {getShelterName(formValues)}</h3>
        <p className="finalParagraph">
          {formValues.step1.shelterId &&
            shelters.find(({ id }) => id === formValues.step1.shelterId)?.name}
        </p>

        <h3 className="finalHeader"> Suma ktorou chcem pomôcť </h3>
        <p className="finalParagraph">
          {formValues.step1.donationAmountCustom ||
            formValues.step1.donationAmountPredefined}
          €
        </p>
        <h3 className="finalHeader"> Meno a priezvisko </h3>
        <p className="finalParagraph">
          {formValues.step2?.firstName + " " + formValues.step2?.lastName ||
            formValues.step2?.lastName}
        </p>

        <h3 className="finalHeader"> E-mailová adresa </h3>
        <p className="finalParagraph">{formValues.step2?.email} </p>

        <h3 className="finalHeader"> Telefónne číslo </h3>
        <p className="finalParagraph"> {formValues?.step2?.phone} </p>

        <Form.Item>
          <Checkbox> Súhlasím so spracovaním osobných údajov </Checkbox>
        </Form.Item>
        <div style={{ float: "right" }}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              style={{
                color: "white",
                background: "#CD8A64",
                height: "59px",
                fontSize: "14px",
                fontWeight: "800",
                fontFamily: "Public Sans",
              }}
              size="large"
            >
              Odoslať formulár
            </Button>
          </Form.Item>
        </div>

        <div>
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            onClick={() => dispatch(previousStep())}
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
      </Form>
    </div>
  );
}

export default App;
