import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Cart() {
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
  } = useContext(AuthContext);
  useEffect(() => {
    getFamily();
  }, []);
  useEffect(() => {
    if (message) {
      toast.success(message);
      reset();
    }
  }, [message]);

  console.log({ family });
  //   return (
  //     <div className="page cart">
  //       <div className="container">
  //         <div className="header">cart</div>
  //         <div className="products">
  //           {family &&
  //             family?.cart?.map((p) => {
  //               const { _id, productName, price, image } = p?.product;
  //               return (
  //                 <div className="product">
  //                   {image !== "" ? (
  //                     <div className="img">
  //                       <img src={image} alt="img" />
  //                     </div>
  //                   ) : (
  //                     <div className="img-frame">img</div>
  //                   )}
  //                   <div className="details">
  //                     <div className="name">{productName}</div>
  //                     <div className="price">{price}$</div>
  //                     <div
  //                       className="remove"
  //                       onClick={() =>
  //                         removeFromCart({
  //                           familyId: family?._id,
  //                           productId: _id,
  //                         })
  //                       }
  //                     >
  //                       <FaTrash />
  //                     </div>
  //                   </div>
  //                 </div>
  //               );
  //             })}
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    <div className="page section">
      <div className="container">
        <div className="header">
          <div className="sectionName">cart</div>
          <Link
            to={`/section/${section?._id}/product/create`}
            className="main-btn"
          >
            add product
          </Link>
        </div>
        <h3>{family?.familyName}'s porducts</h3>
        <div className={`products ${products.length < 3 ? "fixed-width" : ""}`}>
          {family &&
            family.cart.map((p) => {
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
          {family?.cart.length < 1 && (
            <div className="note">your cart is empty</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
