import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/" exact>
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/banks">
          Banks
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={NavLink} to="/calculate">
          Calculate
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
