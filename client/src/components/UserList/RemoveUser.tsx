import React from "react";
import { url, User } from "../../utils/util";
import axios from "axios";
import { Button } from "@mui/material";

type Props = {
  user: User;
};

const RemoveUser: React.FC<Props> = ({ user }) => {
  const onSubmit = async () => {
    try {
      await axios.delete(`${url}/remove_user/${user.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      Wanna Remove {user.name}? <br />
      {user.id}: {user.name}
      <Button size="small" variant="contained" onClick={onSubmit}>
        Yes, Remove
      </Button>
    </div>
  );
};

export default RemoveUser;
