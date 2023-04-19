import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.scss";
function Cart({ setShowNav }) {
  const navigate = useNavigate();
  setShowNav(true);
  const {
    user,
    section,
    products,
    getSection,
    getProducts,
    getFamily,
    family,
    removeFromCart,
    message,
    reset,
  } = useContext(AppContext);
  useEffect(() => {
    getFamily();
  }, []);

  console.log({ family });
  useEffect(() => {
    !user?.token && navigate("/login");
  }, [user]);
  // Function to calculate the total price of products in the cart
  const calculateCartTotal = (cart) => {
    let total = 0;

    // Loop through each item in the cart and calculate total price
    cart?.forEach((item) => {
      total += item.product.price * item.quantity;
    });

    return total;
  };

  // Call the function and get the total price
  const totalPrice = calculateCartTotal(family?.cart);
  const count = family?.cart?.length;

  return !family ? (
    <div
      className="note"
      style={{
        textAlign: "center",
        padding: "20px",
        textTransform: "capitalize",
      }}
    >
      you don't have a family
      <Link to="/family/create" style={{ textDecoration: "underline" }}>
        {" "}
        let's create one
      </Link>
    </div>
  ) : (
    <div className="page section">
      <div className="container">
        <div className="header">
          <div className="sectionName">cart</div>
          <div className="total">
            <span>total</span>${totalPrice}
          </div>
          <div className="count">
            <span>count</span>
            {count}
          </div>
        </div>
        <h3>{family?.familyName}'s cart</h3>
        <div className={`products ${products.length < 3 ? "fixed-width" : ""}`}>
          {family?.cart &&
            family?.cart?.map((p) => {
              const { _id, productName, price, image } = p?.product;
              return (
                <div className="product" key={p?._id}>
                  {image ? (
                    <div className="img">
                      <img src={image} alt="product image" />
                    </div>
                  ) : (
                    <div className="img_frame">product image</div>
                  )}
                  <div className="details">
                    <div className="left">
                      <div className="name"> {productName} </div>
                      <div className="price"> {price}$ </div>
                    </div>
                    <div className="right">
                      <div
                        className="cart"
                        onClick={() =>
                          removeFromCart({
                            familyId: family?._id,
                            productId: _id,
                          })
                        }
                      >
                        <FaTrash />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {family?.cart?.length < 1 && (
            <div className="note">your cart is empty</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
