import Table from "react-bootstrap/Table";

function UserTable({ editHandler, deleteHandler, data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Number</th>
          <th>DOB</th>
        </tr>
      </thead>
      <tbody>
        {data.map((eachUser, index) => {
          return (
            <tr key={index}>
              <td>{eachUser.id}</td>
              <td>{eachUser.name}</td>
              <td>{eachUser.email}</td>
              <td>{eachUser.number}</td>
              <td>{eachUser.dob}</td>
              <td>
                <button onClick={() => editHandler(eachUser)}>Edit</button>
                <button onClick={() => deleteHandler(index)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default UserTable;
