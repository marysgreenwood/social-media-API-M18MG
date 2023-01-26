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
    User.findOne({ _id: req.params.userId })
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
  // update a user by its _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
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
    User.findOneAndDelete({ _id: req.params.userId })
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
  //add a new friend to a user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: "User does not exist!" })
          : res.json({ message: "Friend successfully added!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  //remove a friend from a user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { tags: { tagId: req.params.tagId } } },
      { runValidators: true, new: true }
    )
      .then((friend) =>
        !friend
          ? res.status(404).json({ message: "Friend does not exist!" })
          : res.json({ message: "Friend successfully removed." })
      )
      .catch((err) => res.status(500).json(err));
  },
};
