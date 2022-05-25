const exprress = require("express");
const db = require("../data/database");
const router = exprress.Router();

router.get("/", function (req, res) {
  res.redirect("/customer_orders");
});

router.get("/customer_orders", async function (req, res) {
  try {
    const [datas] = await db.query(
      `SELECT sales.*, customer.name AS customer_name, products.name AS product_name, 
      products.price AS price, sales.quantity* products.price AS position_price  FROM sales 
          INNER JOIN customer ON sales.customerID=customer.uuid 
          INNER JOIN products on sales.productID=products.uuid;`
    );
    console.log(datas);

    const [customerNames] = await db.query("SELECT * FROM `customer`;");

    const [totalQuantity] = await db.query(
      "SELECT SUM(quantity) AS total_quantity FROM sales;"
    );
    const sum = totalQuantity[0].total_quantity;

    console.log(sum, typeof sum);
    const [sumDatas] = await db.query(
      "SELECT SUM(sales.quantity) AS sum_quantity, customer.name AS customer_name, SUM(sales.quantity* products.price) AS total_price FROM sales INNER JOIN customer ON sales.customerID=customer.uuid INNER JOIN products on sales.productID=products.uuid GROUP BY customerID;"
    );
    res.render("index", {
      customerNames: customerNames,
      datas: datas,
      sumDatas: sumDatas,
    });
  } catch (err) {
    console.log(err);
  }
});

const customerTest = function (cusID) {
  return `SELECT SUM(quantity) AS total_quantity FROM sales WHERE customerID=${cusID};`;
};

module.exports = router;
