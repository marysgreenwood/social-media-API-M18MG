const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userControllers");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userid
router.route("/:userid").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userid/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
