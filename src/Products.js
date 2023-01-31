import React, { useReducer } from "react";

const initialState = {
  products: [{}],
  loading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
      return { ...state, loading: true };

    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };

    case "FETCH_PRODUCTS_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const Products = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    try {
      const data = await fetch("https://dummyjson.com/products");
      const products = await data.json();
      console.log(products, "dataa---------------");

      dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: products });
    } catch (error) {
      dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: error });
    }
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <button style={{ margin: "10px auto" }} onClick={fetchProducts}>
        Load Products
      </button>

      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {state?.products?.products?.map((product) => (
          <>
            <div
              class="card"
              style={{ width: "18rem", margin: "10px" }}
              key={product.id}
            >
              <img src={product.thumbnail} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{product.title}</h5>
                <h6 style={{ color: "green" }}>${product.price}</h6>
                <p class="card-text">{product.description}</p>
              </div>
            </div>
          </>
        ))}
      </ul>
    </div>
  );
};
export default Products;
