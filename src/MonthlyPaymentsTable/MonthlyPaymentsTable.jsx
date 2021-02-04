import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) {
    return NaN;
  }
  // If the value is negative...
  if (value < 0) {
    return -decimalAdjust(type, -value, exp);
  }
  // Shift
  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}

// Decimal round
if (!Math.round10) {
  Math.round10 = function (value, exp) {
    return decimalAdjust("round", value, exp);
  };
}
// Decimal floor
if (!Math.floor10) {
  Math.floor10 = function (value, exp) {
    return decimalAdjust("floor", value, exp);
  };
}
// Decimal ceil
if (!Math.ceil10) {
  Math.ceil10 = function (value, exp) {
    return decimalAdjust("ceil", value, exp);
  };
}

export default function MonthlyPaymentsTable(props) {
  const monthlyPayment = useSelector((state) => state.monthlyPayment);
  let content = [];
  let _VV = 0;
  for (let a = 0; a < Number(props.currentBank.loanTerm); a++) {
    const obj = {
      M: a + 1,
      ZP: monthlyPayment,
      VV:
        ((Number(props.currentBank.selectInterestRate) * 0.01) / 12) *
        (Number(props.initialLoan) - monthlyPayment * a),
      BP:
        props.initialLoan -
        monthlyPayment * (a + 1) +
        ((Number(props.currentBank.selectInterestRate) * 0.01) / 12) *
          (Number(props.initialLoan) - monthlyPayment * a) +
        _VV,
      VK:
        monthlyPayment * (a + 1) -
        ((Number(props.currentBank.selectInterestRate) * 0.01) / 12) *
          (Number(props.initialLoan) - monthlyPayment * a) -
        _VV +
        Number(props.downPayment),
    };
    content.push(obj);
    _VV = _VV + obj.VV;
  }
  // console.log(getTablPaymentContent());
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Total payment</th>
          <th>Interest payment</th>
          <th>Loan balance</th>
          <th>Equity</th>
        </tr>
      </thead>
      <tbody>
        {content.map(({ M, ZP, VV, BP, VK }) => {
          return (
            <tr key={M}>
              <td>{M}</td>
              <td>{Math.round10(ZP, -2)}</td>
              <td>{Math.round10(VV, -2)}</td>
              <td>{Math.round10(BP, -2)}</td>
              <td>{Math.round10(VK, 2)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
