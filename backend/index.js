const express = require("express");
const app = express();
const oracledb = require("oracledb");
const cors = require("cors");
const port = 3009;

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: "c##interimproject",
  password: "123",
  connectString: "localhost/orcl",
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
  } catch (err) {
    console.error("Error creating a connection pool: " + err.message);
  }
}

initialize();
const query1="Select final_table.book_id,final_table.title,final_table.isbn13, final_table.publication_date, final_table.quantity, final_table.price,final_table.category,final_table.image_url, final_table.description,author.author_name,review.customerreview from final_table  left join book_author on final_table.book_id=book_author.book_id left join author using (author_id)  left join book_reviews on final_table.book_id=book_reviews.book_id  left join review using (review_id) ";

app.get("/InformationGet", async (req, res) => {
  let connection; // Declare the connection variable outside the try-catch block

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query1);
    console.log(result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  } finally {
    // Release the connection in the finally block
    if (connection) {
      try {
        await connection.close(); // or connection.release() based on your Oracle driver
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
});







const query2="select order_id,cust_order.customer_id,cust_order.order_date,order_history.status_date,order_status.status_value from cust_order left join order_history using (order_id) left join order_status using (status_id) ";

app.get("/OrderInformation", async (req, res) => {
  let connection;
  try {
     connection = await oracledb.getConnection();
    const result = await connection.execute(query2);
    console.log(result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }finally {
    // Release the connection in the finally block
    if (connection) {
      try {
        await connection.close(); // or connection.release() based on your Oracle driver
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
});

app.get("/orderdetails", async (req, res) => {
 
  
  const query5 = "select receipt.* , final_table.title, total.order_total from receipt left join final_table on receipt.book_id=final_table.book_id inner join total on receipt.order_id=total.order_id ";
let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query5);
    console.log('query5...');
    console.log(result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error showing more data");
  }finally {
    // Release the connection in the finally block
    if (connection) {
      try {
        await connection.close(); // or connection.release() based on your Oracle driver
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
  
});



const query3="select customer_id , customer.first_name ||' '|| customer.last_name as CustomerName,customer.email , address.street_number ||' '|| address.street_name ||' '|| city.city_name as CustomerAddress from customer left join customer_address using(customer_id) left join address using (address_id) left join city using(city_id)";
app.get("/CustomerInformation", async (req, res) => {
  let connection; // Declare the connection variable outside the try-catch block

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query3);
    console.log(result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  } finally {
    // Release the connection in the finally block
    if (connection) {
      try {
        await connection.close(); // or connection.release() based on your Oracle driver
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  let connection;
  try {
    connection = await oracledb.getConnection();
    const deleteSQL = "DELETE FROM final_table WHERE book_id = :id";
    const result = await connection.execute(
      deleteSQL,
      {
        id,
      },
      { autoCommit: true }
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting data");
  }finally {
    // Release the connection in the finally block
    if (connection) {
      try {
        await connection.close(); // or connection.release() based on your Oracle driver
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
});

//show more for customer order information



app.get("/showmore", async (req, res) => {
 
  
  const query4 = "select order_id,order_history.status_date,order_status.status_value from cust_order left join order_history using (order_id) left join order_status using (status_id) ";
let connection;
  try {
     connection = await oracledb.getConnection();
    const result = await connection.execute(query4);
    console.log(result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error showing more data");
  }
  finally {
    // Release the connection in the finally block
    if (connection) {
      try {
        await connection.close(); // or connection.release() based on your Oracle driver
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
});




app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});