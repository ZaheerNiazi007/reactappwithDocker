import React, { useState, useEffect } from "react";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://dummyjson.com/products/1");
        console.log("responseee", res.data);
        setLoading(true);
        setProducts(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;
