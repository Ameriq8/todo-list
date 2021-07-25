const User = require("../schema/user.schema");

module.exports = {
  newTodo: async function (user, todo) {
    let userData = await User.findOne({ discordID: user });
    if (userData) {
      userData.todos.push(todo);
      console.log(`Done push todo data to ${userData.discordTag} todos array`);
      return res.status(200).send({
        msg: `Done push todo data to ${userData.discordTag} todos array`,
      });
    } else {
      return res.status(401).send({ msg: "Unauthorized" });
    }
  },
  updateTodo: async function (user, todoId, newData) {
    const userData = await User.findOne({ discordID: user });
    let todo = userData.todos.find((obj) => obj.id == todoId);
    todo.title = newData.title;
    todo.bio = newData.bio;
    userData.save();
    return update
      ? res.status(200)
      : res.status(400).send({ msg: "Could not find document" });
  },
  randomId: function (key_length) {
    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-";
    var string_length = key_length || 6;
    var randomKey = "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomKey += chars.substring(rnum, rnum + 1);
    }
    return randomKey;
  },
};
