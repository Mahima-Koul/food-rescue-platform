let users = [];

const findUser = (uid) => users.find(u => u.uid === uid);

const addUser = (user) => {
  users.push(user);
  return user;
};

module.exports = { findUser, addUser };