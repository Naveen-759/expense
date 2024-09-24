const express = require("express");
const router = express.Router();

const {
  addTransaction,
  getTransactions,
  getTransaction,
  updatetransaction,
  deletetransaction,
} = require("../controllers/expenseController");
const validateToken = require("../middlewares/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getTransactions);

router
  .route("/:id")
  .get(getTransaction)
  .put(updatetransaction)
  .delete(deletetransaction);

router.route("/addtransaction").post(addTransaction);

module.exports = router;
