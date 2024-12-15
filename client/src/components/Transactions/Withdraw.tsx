import React, { useState } from "react";
import GetUser from "../Renders/GetUser";
import { WITHDRAW } from "../../utils/util";
import { makeWithdrawal } from "../../utils/methods";
import MakeTransaction from "../Renders/MakeTransaction";
import useQueryParamUser from "../hooks/getIdParams";

const Withdraw: React.FC = () => {
  const [userId, setUserId] = useState<number | "">();
  const [amount, setAmount] = useState<number>();
  const [openWithdraw, setOpenWithdraw] = useState(true);

  const handleWithdraw = () => {
    const res = makeWithdrawal(userId as number, amount as number);
    res.then((msg) => console.log(msg));
  };

  const updateUserId = (id: number | undefined) => setUserId(id);
  const initializeAmount = () => {
    setUserId(undefined);
    setAmount(undefined);
  };
  const closeWithdraw = () => setOpenWithdraw(!openWithdraw);
  const { user } = useQueryParamUser(updateUserId);
 

  return (
    <div>
      {openWithdraw && (
        <GetUser userId={userId} updateUserId={(id: number) => setUserId(id)} />
      )}
      <div>
        <MakeTransaction
          user={user}
          title="Make Withdrawal"
          handleTransaction={handleWithdraw}
          type={WITHDRAW}
          amount={amount}
          updateAmount={(value: number) => setAmount(value)}
          closeInput={closeWithdraw}
          initializeAmount={initializeAmount}
        />
      </div>
    </div>
  );
};

export default Withdraw;
