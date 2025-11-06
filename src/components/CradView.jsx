import React from "react";

const CardView = ({ products, onEdit }) => {
  return (
    <div>
      <h1>Card View</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "8px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              width: "200px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{product.name}</h3>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
            <p>{product.description}</p>
            <button onClick={() => onEdit(product)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardView;
