import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  const { familyId, product } = req.body;
  console.log({ product });
  const productId = product._id;
  console.log(productId);
  try {
    let cart = await Cart.findOne({ family: familyId });

    if (!cart) {
      cart = new Cart({
        family: familyId,
        products: [{ product: productId }],
      });
    } else {
      if (!productId) {
        return res.status(400).json({ message: "Missing productId parameter" });
      }
      console.log({ cart });
      const existingItemIndex = cart?.products?.findIndex(
        (item) => item?.product?._id === product?._id
      );
      console.log({ existingItemIndex });
      if (existingItemIndex !== -1) {
        return res.status(400).json({ message: "Product already in cart" });
      }
      cart.products.push({ ...product });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const { familyId } = req.body;

  try {
    const cart = await Cart.findOne({ family: familyId });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    const existingItemIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );
    if (existingItemIndex === -1) {
      return res.status(400).json({ message: "Product not in cart" });
    }

    cart.products.splice(existingItemIndex, 1);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
