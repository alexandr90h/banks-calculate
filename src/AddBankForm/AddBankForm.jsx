import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as operation from "../redux/operation";

export default function AddBankForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [selectInterestRate, setSelectInterestRate] = useState(1);
  const [maximumLoan, setMaximumLoan] = useState("");
  const [minimumPayment, setMinimumPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState(3);

  const inputChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "selectInterestRate":
        setSelectInterestRate(e.target.value);
        break;
      case "maximumLoan":
        setMaximumLoan(e.target.value);
        break;
      case "minimumPayment":
        setMinimumPayment(e.target.value);
        break;
      case "loanTerm":
        setLoanTerm(e.target.value);
        break;
      default:
        break;
    }
  };
  const onHendleSubmitBank = (e) => {
    e.preventDefault();
    dispatch(
      operation.addBank({
        name,
        selectInterestRate,
        maximumLoan,
        minimumPayment,
        loanTerm,
      })
    );
    reset();
  };
  const reset = () => {
    setName("");
    setSelectInterestRate(1);
    setMaximumLoan("");
    setMinimumPayment("");
    setLoanTerm(3);
  };
  return (
    <Form onSubmit={onHendleSubmitBank}>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Name bank</Form.Label>
        <Form.Control
          type="text"
          placeholder="name"
          name="name"
          value={name}
          onChange={inputChange}
        />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Interest rate</Form.Label>
        <Form.Control
          as="select"
          name="selectInterestRate"
          value={selectInterestRate}
          onChange={inputChange}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.Control2">
        <Form.Label>Maximum loan ($)</Form.Label>
        <Form.Control
          type="text"
          placeholder="0.00"
          name="maximumLoan"
          value={maximumLoan}
          onChange={inputChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.Control3">
        <Form.Label>Minimum down payment ($)</Form.Label>
        <Form.Control
          type="text"
          placeholder="0%"
          name="minimumPayment"
          value={minimumPayment}
          onChange={inputChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect2">
        <Form.Label>Loan term (month)</Form.Label>
        <Form.Control
          as="select"
          name="loanTerm"
          value={loanTerm}
          onChange={inputChange}
        >
          <option>3</option>
          <option>6</option>
          <option>12</option>
          <option>18</option>
          <option>24</option>
          <option>36</option>
        </Form.Control>
      </Form.Group>
      <Button type="submit" className="mb-2">
        Submit
      </Button>
    </Form>
  );
}
