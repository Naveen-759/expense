import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Transaction = ({ transcation }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transcation.amount < 0 ? "-" : "+";

  return (
    <li className={transcation.amount < 0 ? "minus" : "plus"}>
      {transcation.text}{" "}
      <span>
        {sign}${Math.abs(transcation.amount)}
      </span>
      <button
        onClick={() => {
          deleteTransaction(transcation._id);
          console.log(transcation._id);
        }}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};
