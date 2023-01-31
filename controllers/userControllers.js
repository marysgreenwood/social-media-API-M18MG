const { User, Thought } = require("../models");

userControllers = {
  // GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userid })
      .select("-__v")
      .populate("friends")
      .populate({ path: "thoughts", model: Thought })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => {
        res.status(500).json(err);
        console.log("NOOOOOOOOOOOOOOOO", err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  },
  // update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userid },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove user by its _id (& associated thoughts)
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userid })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that id" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  //add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userid },
      { $addToSet: { friends: { _id: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: "User does not exist!" })
          : res.json({ message: "Friend added successfully!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  //remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userid },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Incorrect user id" })
          : res.json({ message: "Friend removed successfully" })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = userControllers;
