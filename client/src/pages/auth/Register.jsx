import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Auth.scss";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Register({ setShowNav }) {
  const navigate = useNavigate();
  setShowNav(true);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { register, error, message, reset } = useContext(AppContext);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    // Send the POST request to the backend
    try {
      // axios.put(url,body)
      // const { data } = await axios.post(
      //   "http://localhost:3001/api/auth/register",
      //   user
      // );
      // console.log(data);
      register({ ...user, image });
    } catch (error) {
      console.log(error);
    }
  };
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
  useEffect(() => {
    if (message) {
      reset();
      navigate("/login");
    }
    if (error) {
      toast.error(error);
      reset();
    }
  }, [message, error]);

  return (
    <div className="register">
      <div className="container">
        <form className="form" onSubmit={submitHandler}>
          <div className="item">
            <label>first name</label>
            <input
              name="firstName"
              type="text"
              placeholder="first name"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>last name</label>
            <input
              name="lastName"
              type="text"
              placeholder="last name"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>email</label>
            <input
              name="email"
              type="email"
              placeholder="email"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label>password</label>
            <input
              name="password"
              type="passowrd"
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <input type="file" onChange={handleImageChange} accept="image/*" />
            {imagePreview && (
              <div className="previewImg">
                <img src={imagePreview} width={100} height={100} alt="img" />
              </div>
            )}
          </div>
          <input type="submit" className="submit" />
          <Link to="/login" className="link">
            login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
