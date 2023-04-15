import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import "./SectionDetails.scss";
import { FaTrash, FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
function SectionDetails() {
  const navigate = useNavigate();
  const {
    user,
    section,
    products,
    getSection,
    getProducts,
    getFamily,
    family,
    removeProduct,
    removerSection,
    addToCart,
    message,
    reset,
  } = useContext(AuthContext);

  const { id } = useParams();
  console.log({ id });
  useEffect(() => {
    getFamily();
  }, []);

  useEffect(() => {
    if (family?._id) {
      getSection(id);
    }
  }, [family?._id]);
  useEffect(() => {
    if (section?._id) {
      getProducts(section?._id);
    }
  }, [section?._id]);

  useEffect(() => {
    if (message) {
      // toast.success(message);
    }
    reset();
  }, [message]);

  return (
    <div className="page section">
      <div className="container">
        <div className="header">
          <div className="sectionName">{section?.sectionName}</div>
          <div className="control">
            <Link
              to={`/section/${section?._id}/product/create`}
              className="main-btn"
            >
              add product
            </Link>
            <div
              className="main-btn"
              onClick={() => removerSection(section?._id)}
            >
              <FaTrash />
            </div>
          </div>
        </div>
        <h3>{section?.sectionName}'s porducts</h3>
        <div className={`products ${products.length < 3 ? "fixed-width" : ""}`}>
          {products.length > 0 ? (
            products.map((p) => (
              <div className="product" key={p?._id}>
                {p?.image ? (
                  <div className="img">
                    <img src={p?.image} alt="product image" />
                  </div>
                ) : (
                  <div className="img_frame">product image</div>
                )}
                <div className="details">
                  <div className="left">
                    <div className="name"> {p?.productName} </div>
                    <div className="price"> {p?.price}$ </div>
                  </div>
                  <div className="right">
                    <div className="delete" onClick={() => removeProduct(p)}>
                      <FaTrash />
                    </div>
                    <div
                      className="cart"
                      onClick={() =>
                        addToCart({
                          familyId: family?._id,
                          productId: p?._id,
                        })
                      }
                    >
                      <FaCartPlus />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="note">no products in this section</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SectionDetails;
