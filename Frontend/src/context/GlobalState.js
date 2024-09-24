import React, {
  createContext,
  useContext,
  useEffect,
  // useReducer,
  useState,
} from "react";
// import AppReducer from "./AppReducer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

// const initialState = {
//   transactions1: [],
// };

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(AppReducer, initialState);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [transactions, setTransactions] = useState("");

  let isLoggedIn = !!token;

  // function deleteTransactionDispatch(id) {
  //   dispatch({
  //     type: "DELETE_TRANSACTION",
  //     payload: id,
  //   });
  // }

  const generatePdf = async (total) => {
    console.log(user, "Generating pdf");
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleString();

    // Add Title
    doc.setFontSize(18);
    doc.text("Transaction Report", 14, 22);

    // Add Date, User Name, and Phone Number
    doc.setFontSize(12);
    doc.text(`Exported On: ${currentDate}`, 14, 32);
    doc.text(`User: ${user.name}`, 14, 42);
    doc.text(`Phone Number: ${user.phone}`, 14, 52);

    // Prepare the transactions for the table
    const transactionTable = [];
    {
      transactions &&
        transactions.map((txn, index) =>
          transactionTable.push([
            index + 1,
            new Date(txn.createdAt).toLocaleDateString(),
            txn.text,
            txn.amount,
          ])
        );
    }

    // Add the table
    doc.autoTable({
      head: [["#", "Date", "Item", "Amount"]],
      body: transactionTable,
      startY: 60,
    });

    doc.text(`Balance:${total}/-`, 164, 52);

    // Save the PDF
    doc.save("transaction_report.pdf");
  };

  const deleteTransaction = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/expense-tracker/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Deleted successfully");
      getTransactions();
    } catch (error) {
      console.log("Error while deleting the transaction", error);
    }
  };

  // function addTransaction(transaction) {
  //   dispatch({
  //     type: "ADD_TRANSACTION",
  //     payload: transaction,
  //   });
  // }
  const addTransaction = async (newTransaction) => {
    const response = await fetch(
      "http://localhost:5001/api/expense-tracker/addtransaction",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      }
    );
    console.log(response);
    if (response.ok) {
      getTransactions();
    }
  };
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/users/current-user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setUser(data);
      }
    } catch (error) {
      console.log("Error in fetching the current user");
    }
  };
  const getTransactions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/expense-tracker/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
        // initialState.transactions.push(data);
        console.log("Transactions fetched successfully");
      } else {
        console.log("Error in fetching transactions");
      }
    } catch (error) {
      console.log("No transactions fetched");
    }
  };
  useEffect(() => {
    deleteTransaction();
    getTransactions();
    userAuthentication();
  }, []);

  const userLogOut = () => {
    setToken("");
    toast.success("User Logged out");
    return localStorage.removeItem("token");
  };

  return (
    <GlobalContext.Provider
      value={{
        getTransactions,
        generatePdf,
        deleteTransaction,
        addTransaction,
        storeTokenInLS,
        userLogOut,
        isLoggedIn,
        user,
        transactions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const globalConextValue = useContext(GlobalContext);
  if (!globalConextValue) {
    throw new Error("useGlobal is used outside of the Provider");
  }
  return globalConextValue;
};
