import React, { useContext } from "react";
import "./Balance.css";
import { GlobalContext } from "../context/GlobalState";
// import { useGlobal } from "../context/GlobalState";
export const Balance = () => {
  const { transactions, generatePdf } = useContext(GlobalContext);
  // const { transactions } = useGlobal();
  let amounts = [];
  {
    transactions &&
      transactions.forEach((transaction) => {
        amounts.push(parseFloat(transaction.amount));
      });
  }

  const total = amounts.reduce((acc, item) => (acc += item), 0);
  // for (let i = 0; i < amounts.length; i++) {
  //   total += amounts[i];
  // }
  const handleClick = () => {
    generatePdf(total);
  };

  return (
    <div className="balance">
      <div className="balance-amt">
        <h4>Your Blance</h4>
        <h1>₹{total}</h1>
      </div>
      <button className="pdf-button" onClick={handleClick}>
        Generate PDF
      </button>
    </div>
  );
};
