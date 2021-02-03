import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as operation from "../redux/operation";

export default function Calculate() {
  const dispatch = useDispatch();
  const banksNames = useSelector((state) => state.banks);
  const [currentBank, setCurrentBank] = useState({});
  const [initialLoan, setInitialLoan] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [bankName, setBankName] = useState();
  const inputChange = (e) => {
    switch (e.target.name) {
      case "initialLoan":
        setInitialLoan(e.target.value);
        break;
      case "downPayment":
        setDownPayment(e.target.value);
        break;
      case "bankName":
        setBankName(e.target.value);
        break;
      default:
        break;
    }
  };
  const onHendleSubmitQuery = (e) => {
    e.preventDefault();
    setCurrentBank(banksNames.find(({ name }) => name === bankName));
    console.log(bankName);
    console.log(currentBank);
  };
  useEffect(() => {
    dispatch(operation.fetchBankList());
  }, [dispatch]);
  return (
    <Form onSubmit={onHendleSubmitQuery}>
      <Form.Group controlId="formBasicInitialLoan">
        <Form.Label>Initial loan ($)</Form.Label>
        <Form.Control
          type="text"
          placeholder="0.00"
          name="initialLoan"
          value={initialLoan}
          onChange={inputChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicdownPayment">
        <Form.Label>Down payment ($)</Form.Label>
        <Form.Control
          type="text"
          placeholder="0.00"
          name="downPayment"
          value={downPayment}
          onChange={inputChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Bank</Form.Label>
        <Form.Control
          required
          as="select"
          custom
          name="bankName"
          value={bankName}
          onChange={inputChange}
        >
          {banksNames.map((obj) => {
            return (
              <option key={obj.id} value={obj.name}>
                {obj.name}
              </option>
            );
          })}
        </Form.Control>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
