import { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function AddDonation() {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "donations"), {
        foodName,
        quantity: Number(quantity),
        expiryTime,
        address,
        restaurantId: auth.currentUser?.uid,
        status: "available",
        createdAt: serverTimestamp(),
      });

      alert("Donation added 🚀");
    } catch (err) {
      console.log(err);
      alert("Error adding donation");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Food Name" onChange={(e) => setFoodName(e.target.value)} />
      <input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
      <input placeholder="Expiry Time" onChange={(e) => setExpiryTime(e.target.value)} />
      <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
      <button>Post</button>
    </form>
  );
}

export default AddDonation;