import React, { useContext } from "react";
// import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";
import { GlobalContext } from "../context/GlobalState";

export const TransactionList = () => {
  // const { transactions } = useContext(GlobalContext);
  const { transactions } = useContext(GlobalContext);
  console.log(transactions);
  return (
    <div>
      <h3>History</h3>
      <ul id="list" className="list">
        {transactions &&
          transactions.map((transcation) => (
            <Transaction key={transcation._id} transcation={transcation} />
          ))}
      </ul>
    </div>
  );
};
