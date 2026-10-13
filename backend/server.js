import express from "express";
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 5000

app.get("/api/products", async (req, res) => {
  try {
    const categories = [
      "mens-shirts",
      "womens-dresses",
      "tops",
    ];

    const responses = await Promise.all(
      categories.map((category) =>
        fetch(`https://dummyjson.com/products/category/${category}`)
      )
    );

    const results = await Promise.all(
      responses.map((response) => response.json())
    );

    const products = results.flatMap((result) => result.products);

    res.json({
      total: products.length,
      products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch products",
    });
  }
});

app.listen(PORT,() =>{
   console.log(`server is running at http:localhost:${PORT}`)
})