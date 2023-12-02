const express = require("express");
const app = express();
const oracledb = require("oracledb");
const cors = require("cors");
const port = 3008;

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


//customers end
const query1="Select final_table.title, final_table.quantity, final_table.price,final_table.category,final_table.image_url,author.author_name,final_table.book_id from final_table  left join book_author on final_table.book_id=book_author.book_id left join author using (author_id)";
const query4="Select final_table.title, final_table.quantity, final_table.price,final_table.category,final_table.image_url,author.author_name,final_table.book_id from final_table  left join book_author on final_table.book_id=book_author.book_id left join author using (author_id) where final_table.category=:category";
app.get("/DisplayItems", async (req, res) => {
let category = req.query.category;
console.log('category:', category);
console.log('category:', category);
  let connection; // Declare the connection variable outside the try-catch block

  try {
    let flag=0;
  if (category === undefined) {
    flag = 1; // Set flag to 1 if category is undefined
    category = ''; // Assign an empty string to category
  }
 
    connection = await oracledb.getConnection();
    if (flag==0){
    const result = await connection.execute(query4,{category,},);
    console.log("with ");
    res.send(result.rows);
    }else{
      console.log(flag);
      const result = await connection.execute(query1);
      console.log("without ");
    res.send(result.rows);
    }
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

const query2="Select final_table.book_id,final_table.title,final_table.isbn13, final_table.publication_date, final_table.quantity, final_table.price,final_table.category,final_table.image_url, final_table.description,author.author_name,review.customerreview from final_table  left join book_author on final_table.book_id=book_author.book_id left join author using (author_id)  left join book_reviews on final_table.book_id=book_reviews.book_id  left join review using (review_id) where final_table.book_id=:prodid";
app.get("/GetProduct", async (req, res) => {
    let connection; // Declare the connection variable outside the try-catch block
    const prodid = req.query.productId;
    try {
      connection = await oracledb.getConnection();
      const result = await connection.execute(query2,{prodid},);
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

  const query3="select distinct category from final_table ";

app.get("/getCategory", async (req, res) => {
  let connection;
  try {
     connection = await oracledb.getConnection();
    const result = await connection.execute(query3);
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


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

