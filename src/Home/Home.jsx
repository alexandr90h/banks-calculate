import { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import * as operation from "../redux/operation";

export default function Home() {
  const banks = useSelector((state) => state.banks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(operation.fetchBankList());
  }, [dispatch]);
  return (
    <ListGroup>
      {banks.map((obj) => {
        return (
          <ListGroup.Item variant="primary" key={obj.id}>
            {obj.name}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
