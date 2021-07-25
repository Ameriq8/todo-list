const router = require("express").Router();
const User = require("../database/schema/user.schema");
const {
  randomId,
  newTodo,
  updateTodo,
} = require("../database/methods/todo.methods");

router.get("/todos", async (req, res) => {
  const user = await User.findOne({ discordId: req.user.discordId });
  if (user) {
    const userTodos = user.get("todos");
    res.send(userTodos);
  } else {
    return res.status(401).send({ msg: "Unauthorized" });
  }
});

router.post("/todos", async (req, res) => {
  const { title, bio } = req.body;
  const user = req.user.discordId;
  const key = randomId(8);
  if (!title || !bio)
    return res.status(400).send({ msg: "Some fileds not filled" });

  const todo = { id: key, title: title, bio: bio };
  await newTodo(user, todo);
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { title, bio } = req.body;
  if (!title || !bio)
    return res.status(400).send({ msg: "Some fileds not filled" });

  const newData = { id: id, title: title, bio: bio };
  await updateTodo(req.user.discordId, id, newData);
});

router.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const config = await User.findOne({ discordID: req.user.discordId }).get("todos");
  return config ? res.send(config) : res.status(400).send({ msg: "Not found" });
});

module.exports = router;
