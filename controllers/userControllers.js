const { User, Thought } = require("../models/user");

module.exports = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ user_id: req.params.userId })
      //TRY COMMENTING OUT .SELECT & SEE WHAT HAPPENS
      .select("-__v")
      .populate("posts", "friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // PUT to update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { user_id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // DELETE to remove user by its _id (& associated thoughts)
  deleteUser(req, res) {
    User.findOneAndDelete({ user_id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
};

// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
