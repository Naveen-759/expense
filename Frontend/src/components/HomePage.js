import "../App.css";
import { AddTransaction } from "../components/AddTransaction";
import { Balance } from "../components/Balance";
import { IncomeExpenses } from "../components/IncomeExpenses";
import { TransactionList } from "../components/TransactionList";
import { GlobalProvider } from "../context/GlobalState";

import React from "react";

export const HomePage = () => {
  return (
    <GlobalProvider>
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
};
