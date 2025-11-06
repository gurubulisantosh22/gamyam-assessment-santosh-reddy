import React, { useState, useEffect, useCallback } from "react";
import TableView from "./components/TableView";
import CardView from "./components/CradView";
import ProductForm from "./components/ProductForm";

function App() {
  const [isTableView, setIsTableView] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data
  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  // Debounced Search (500ms)
  const debounceSearch = useCallback(() => {
    const handler = setTimeout(() => {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1); // reset to first page when searching
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, products]);

  useEffect(() => {
    const cleanup = debounceSearch();
    return cleanup;
  }, [debounceSearch]);

  // Add or Update Product
  const handleSaveProduct = (productData) => {
    if (productData.id) {
      // update
      const updated = products.map((p) =>
        p.id === productData.id ? productData : p
      );
      setProducts(updated);
      setFilteredProducts(updated);
    } else {
      // add new product
      const newProduct = {
        ...productData,
        id: Date.now(),
      };
      const updated = [...products, newProduct];
      setProducts(updated);
      setFilteredProducts(updated);
    }
    setIsFormVisible(false);
    setSelectedProduct(null);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsFormVisible(true);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Product Management (Search / Add / Edit / Pagination)</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setIsTableView(!isTableView)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "blue",
            color: "white",
            marginRight: "10px",
          }}
        >
          {isTableView ? "Switch to Card View" : "Switch to Table View"}
        </button>

        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsFormVisible(true);
          }}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "green",
            color: "white",
          }}
        >
          Add Product
        </button>
      </div>

      {/* Conditional Rendering */}
      {isFormVisible ? (
        <ProductForm
          onSave={handleSaveProduct}
          onCancel={() => setIsFormVisible(false)}
          product={selectedProduct}
        />
      ) : filteredProducts.length === 0 ? (
        <h3 style={{ color: "red", marginTop: "20px" }}>No products found</h3>
      ) : isTableView ? (
        <TableView products={paginatedProducts} onEdit={handleEditClick} />
      ) : (
        <CardView products={paginatedProducts} onEdit={handleEditClick} />
      )}

      {/* Pagination Controls */}
      {!isFormVisible && filteredProducts.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              marginRight: "10px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              style={{
                padding: "8px 12px",
                marginRight: "5px",
                cursor: "pointer",
                backgroundColor:
                  currentPage === i + 1 ? "blue" : "transparent",
                color: currentPage === i + 1 ? "white" : "black",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              marginLeft: "10px",
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
