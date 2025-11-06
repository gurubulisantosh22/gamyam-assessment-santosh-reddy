import React from "react";

const TableView = ({ products, onEdit }) => {
  return (
    <div>
      <h1>Table View</h1>
      <table
        style={{
          width: "100%",
          border: "1px solid black",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Price</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Category
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Stock</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Description
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {product.name}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                ₹{product.price}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {product.category}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {product.stock}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {product.description}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button onClick={() => onEdit(product)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
