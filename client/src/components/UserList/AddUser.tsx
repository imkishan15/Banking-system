import axios from "axios";
import React, { useState } from "react";
import { url } from "../../utils/util";
import { Button, TextField } from "@mui/material";
import { LoadingComponent } from "./UserList";
import { UserData } from "../../context/UserContext";

type Props = {
  closeModal: () => void;
};

const AddUser: React.FC<Props> = ({ closeModal }) => {
  const { getAllUsers } = UserData();
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    try {
      await axios.post(`${url}/add_user/${name}`);
    } catch (e) {
      console.log(e);
    }
    setName("");
    setLoading(true);
    try {
      await getAllUsers();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    closeModal()
  };
  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <label>Enter name: </label>
          <TextField
            id="outlined-basic"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            variant="outlined"
          />{" "}
          <Button variant="contained" onClick={onSubmit}>
            Add User
          </Button>
        </>
      )}
    </div>
  );
};

export default AddUser;
