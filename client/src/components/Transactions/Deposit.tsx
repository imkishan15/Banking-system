import React, { useState } from "react";
import GetUser from "../Renders/GetUser";
import { DEPOSIT } from "../../utils/util";
import { makeDeposit } from "../../utils/methods";
import MakeTransaction from "../Renders/MakeTransaction";
import useQueryParamUser from "../hooks/getIdParams";

const Deposit: React.FC = () => {
  const [userId, setUserId] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const closeWithdraw = () => setOpenWithdraw(!openWithdraw);
  const [openWithdraw, setOpenWithdraw] = useState(true);

  const updateUserId = (id: number | undefined) => setUserId(id);
  const { user } = useQueryParamUser(updateUserId);
  const initializeAmount = () => {
    setUserId(undefined);
    setAmount(undefined);
  };
  const handleDeposit = () => {
    const res = makeDeposit(userId as number, amount as number);
    res.then((msg) => console.log(msg));
  };

  return (
    <div>
      {openWithdraw && (
        <GetUser userId={userId} updateUserId={(id: number) => setUserId(id)} />
      )}
      <div>
        <MakeTransaction
          user={user}
          title="Make Withdrawal"
          handleTransaction={handleDeposit}
          type={DEPOSIT}
          amount={amount}
          updateAmount={(value: number) => setAmount(value)}
          initializeAmount={initializeAmount}
          closeInput={closeWithdraw}
        />
      </div>
    </div>
  );
};

export default Deposit;
