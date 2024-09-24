const asyncHandler = require("express-async-handler");

const Transaction = require("../models/transactionModel");

const addTransaction = asyncHandler(async (req, res) => {
  const { text, amount } = req.body;
  if (!text || !amount) {
    res.status(400);
    throw new Error("All field are mandatory!");
  }
  const transaction = await Transaction.create({
    text,
    amount,
    user_id: req.user.id,
  });
  res.status(201).json(transaction);
  console.log(req.body);
});

const getTransactions = asyncHandler(async (req, res) => {
  console.log("here", req.user);
  const transactions = await Transaction.find({ user_id: req.user.id });
  res.status(200).json(transactions);
});

const getTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    res.status(404);
    throw new Error("Transaction doesn't exists");
  }
  res.status(200);
  res.json(transaction);
});

const updatetransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    res.status(404);
    throw new Error("Transaction doesn't exists");
  }

  if (transaction.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User can't access this transaction");
  }

  const updatedTranscation = await Transaction.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(updatedTranscation);
});

const deletetransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  if (!transaction) {
    res.status(400);
    throw new Error("Transaction doesn't exists");
  }

  if (transaction.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User can't access this transaction");
  }

  const re = await transaction.deleteOne();
  console.log(re);

  res.status(200).json(transaction);
  console.log("delete route");
});

module.exports = {
  addTransaction,
  getTransactions,
  getTransaction,
  updatetransaction,
  deletetransaction,
};
