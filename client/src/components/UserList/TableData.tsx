import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { INFO, REMOVE, User } from "../../utils/util";
import ModalWrapper from "./ModalWrapper";
import AddUser from "./AddUser";
import UserGraph from "./UserGraph/UserGraph";

type Props = {
  users: User[];
  handleModal: (user: User, type: typeof REMOVE | typeof INFO) => void;
};

const TableData: React.FC<Props> = ({ users, handleModal }) => {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openUsersGraph, setOpenUsersGraph] = useState(false);

  return (
    <div>
      <ModalWrapper
        openModal={openAddUserModal}
        setOpenModal={setOpenAddUserModal}
        title="Add User"
      >
        <AddUser closeModal={() => setOpenAddUserModal(false)} />
      </ModalWrapper>
      <ModalWrapper
        openModal={openUsersGraph}
        setOpenModal={setOpenUsersGraph}
        title="Users Balance Graph"
      >
        <UserGraph users={users} />
      </ModalWrapper>
      <TableContainer component={Paper} sx={{ maxHeight: 480 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Balance</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => setOpenUsersGraph(true)}
                  variant="contained"
                >
                  Users Graph
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => setOpenAddUserModal(true)}
                  variant="contained"
                >
                  Add User
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{user.id}</TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.balance}</TableCell>
                <TableCell align="center">
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => handleModal(user, INFO)}
                  >
                    Info
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleModal(user, REMOVE)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableData;
