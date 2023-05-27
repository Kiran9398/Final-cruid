import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import UserTable from "./Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const gettingDataFromlocalStorage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (userData) {
    return userData;
  } else {
    return [];
  }
};

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [dob, setDob] = useState("");
  const [data, setData] = useState(gettingDataFromlocalStorage());
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(data));
  }, [data]);

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
  };
  const onChangeEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onChangeNumberHandler = (e) => {
    setNumber(e.target.value);
  };
  const onChangeDobHandler = (e) => {
    setDob(e.target.value);
  };

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  // const id = new Date();

  const addHandler = (e) => {
    e.preventDefault();

    const userData = {
      // id: id.toISOString(),
      id: small_id,
      name,
      email,
      number,
      dob,
    };

    setData([...data, userData]);
    setName("");
    setEmail("");
    setNumber("");
    setDob("");
  };

  const updateHandler = () => {
    const updatedUsers = data.map((eachUser) => {
      if (edit === eachUser) {
        return {
          id: eachUser.id,
          name,
          email,
          number,
          dob,
        };
      } else {
        return eachUser;
      }
    });

    setData(updatedUsers);
    setName("");
    setEmail("");
    setNumber("");
    setDob("");
    setEdit(null);
    setShow(false);
  };

  const deleteHandler = (i) => {
    data.splice(i, 1);
    setData([...data]);
  };

  const editHandler = (eachUser) => {
    setName(eachUser.name);
    setEmail(eachUser.email);
    setNumber(eachUser.number);
    setDob(eachUser.dob);
    setShow(true);
    setEdit(eachUser);
  };

  return (
    <div className="container">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            onChange={onChangeNameHandler}
            type="email"
            value={name}
            placeholder="Enter Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            onChange={onChangeEmailHandler}
            value={email}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="number"
            onChange={onChangeNumberHandler}
            value={number}
            placeholder="Enter Mobile Number"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDateofbirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            onChange={onChangeDobHandler}
            value={dob}
            placeholder="Enter Date of Birth"
          />
        </Form.Group>

        {!show ? (
          <Button onClick={addHandler} className="button">
            ADD
          </Button>
        ) : (
          <Button onClick={updateHandler} className="button">
            Update
          </Button>
        )}
      </Form>

      <div>
        <h1>User Data</h1>
        <UserTable
          data={data}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
        />
      </div>
    </div>
  );
}

export default UserForm;
