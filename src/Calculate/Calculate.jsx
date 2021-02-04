import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as operation from "../redux/operation";
import bankAction from "../redux/action";
import MonthlyPaymentsTable from "../MonthlyPaymentsTable/MonthlyPaymentsTable";

export default function Calculate() {
  const dispatch = useDispatch();
  const banksNames = useSelector((state) => state.banks);
  const monthlyPayment = useSelector((state) => state.monthlyPayment);
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
        setCurrentBank(banksNames.find(({ name }) => name === e.target.value));
        break;
      default:
        break;
    }
  };
  const onMonthlyPayment = (P, r, n) => {
    const _r = r / 100;
    console.log(P, r, n);
    const M =
      (P * (_r / 12) * Math.pow(1 + _r / 12, n)) /
      (Math.pow(1 + _r / 12, n) - 1);
    return M;
  };
  const onHendleSubmitQuery = (e) => {
    e.preventDefault();
    console.log(bankName);
    console.log(currentBank);
    dispatch(
      bankAction.setMonthlyPayment(
        onMonthlyPayment(
          Number(initialLoan),
          Number(currentBank.selectInterestRate),
          Number(currentBank.loanTerm)
        )
      )
    );
  };
  useEffect(() => {
    dispatch(operation.fetchBankList());
  }, [dispatch]);
  return (
    <>
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
            // value={bankName}
            onChange={inputChange}
          >
            <option>...</option>
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
      {monthlyPayment && <MonthlyPaymentsTable currentBank={currentBank} />}
    </>
  );
}
