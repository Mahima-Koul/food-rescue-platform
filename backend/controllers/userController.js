const { findUser, addUser } = require("../models/userModel");

const createUser = (req, res) => {
  const { role, name, phone, address } = req.body;

  let user = findUser(req.user.uid);

  if (user) return res.json(user);

  user = {
    uid: req.user.uid,
    email: req.user.email,
    role,
    name,
    phone,
    address,
  };

  addUser(user);

  res.json(user);
};

module.exports = { createUser };