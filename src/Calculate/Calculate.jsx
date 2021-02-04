import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as operation from "../redux/operation";
import bankAction from "../redux/action";
import MonthlyPaymentsTable from "../MonthlyPaymentsTable/MonthlyPaymentsTable";
import Alert from "react-bootstrap/Alert";

export default function Calculate() {
  const dispatch = useDispatch();
  const banksNames = useSelector((state) => state.banks);
  const monthlyPayment = useSelector((state) => state.monthlyPayment);
  const [currentBank, setCurrentBank] = useState({});
  const [initialLoan, setInitialLoan] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [onAlertShow, setOnAlertShow] = useState(false);
  const inputChange = (e) => {
    switch (e.target.name) {
      case "initialLoan":
        setInitialLoan(e.target.value);
        break;
      case "downPayment":
        setDownPayment(e.target.value);
        break;
      case "bankName":
        setCurrentBank(banksNames.find(({ name }) => name === e.target.value));
        break;
      default:
        break;
    }
  };
  const onMonthlyPayment = (P, r, n) => {
    const _r = r / 100;
    const M =
      (P * (_r / 12) * Math.pow(1 + _r / 12, n)) /
      (Math.pow(1 + _r / 12, n) - 1);
    return M;
  };
  const onHendleSubmitQuery = (e) => {
    e.preventDefault();
    if (currentBank.maximumLoan < initialLoan) {
      setOnAlertShow(true);
      return;
    }
    if (
      (currentBank.minimumPayment / 100) * currentBank.maximumLoan >
      downPayment
    ) {
      setOnAlertShow(true);
      return;
    }
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
      {monthlyPayment && (
        <MonthlyPaymentsTable
          currentBank={currentBank}
          initialLoan={initialLoan}
          downPayment={downPayment}
        />
      )}
      {onAlertShow && (
        <Alert
          variant="danger"
          onClose={() => setOnAlertShow(false)}
          dismissible
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      )}
    </>
  );
}
