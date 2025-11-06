import React, { useState, useEffect } from "react";

const ProductForm = ({ onSave, onCancel, product }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(formData.price)) newErrors.price = "Price must be a number";
    if (!formData.category.trim()) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock || 0),
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
      }}
    >
      <h3>{product ? "Edit Product" : "Add New Product"}</h3>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.name}</div>
          )}
        </div>

        {/* Price */}
        <div style={{ marginBottom: "10px" }}>
          <label>Price: </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
          {errors.price && (
            <div style={{ color: "red", fontSize: "12px" }}>{errors.price}</div>
          )}
        </div>

        {/* Category */}
        <div style={{ marginBottom: "10px" }}>
          <label>Category: </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
          {errors.category && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {errors.category}
            </div>
          )}
        </div>

        {/* Stock */}
        <div style={{ marginBottom: "10px" }}>
          <label>Stock: </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "10px" }}>
          <label>Description: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            style={{ marginLeft: "10px", padding: "5px", width: "200px" }}
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          style={{
            padding: "8px 15px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          {product ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "8px 15px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
