import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./CreateProduct.scss";

function CreateProduct() {
  const {
    user,
    getFamily,
    section,
    message,
    getSection,
    error,
    createSection,
    addProduct,
    reset,
  } = useContext(AppContext);
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getSection();
  }, []);
  useEffect(() => {
    if (error) {
      toast.error(
        error === "request entity too large" &&
          "image size should be less than 1mb"
      );
      reset();
    }
  }, [error]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file.size > 1024 * 1024) {
  //     toast.error("File size exceeds 1MB limit");
  //     return;
  //   }

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImage(reader.result);
  //       setImagePreview(reader.result);
  //     }
  //   };

  //   reader.readAsDataURL(file);
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    if (file.size > 1024 * 1024) {
      toast.error("File size exceeds 1MB limit");
      return;
    }
    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        // Create canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to WebP format
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], "image.webp", {
              type: "image/webp",
              lastModified: Date.now(),
            });

            const reader = new FileReader();

            reader.onload = () => {
              setImage(reader.result);
              setImagePreview(reader.result);
            };

            reader.readAsDataURL(file);
          },
          "image/webp",
          0.8
        );
      };

      img.src = reader.result;
    };

    reader.readAsDataURL(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const productData = {
      productName,
      price,
      sectionId: id,
      image,
    };
    console.log(productData);
    addProduct(productData);
  };

  useEffect(() => {
    if (message) {
      setImagePreview("");
      setPrice(0);
      setProductName("");
      setImage("");
      reset();
      navigate(`/section/${section._id}`);
    }
  }, [message]);

  useEffect(() => {
    !user?.token && navigate("/login");
  }, [user]);
  return (
    <div className="craeteSection page">
      <form onSubmit={submitHandler}>
        <div className="item">
          <input
            type="text"
            value={productName}
            placeholder="product name"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="item">
          <input
            type="number"
            value={price}
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="item">
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {imagePreview !== "" && (
            <div className="previewImg">
              <img src={imagePreview} alt="img" />
            </div>
          )}
        </div>
        <input
          type="submit"
          className={`main-btn submit ${
            productName === "" || price === null || price === ""
              ? "disabled"
              : ""
          }`}
          disabled={productName === "" || price === 0}
        />
      </form>
    </div>
  );
}

export default CreateProduct;
