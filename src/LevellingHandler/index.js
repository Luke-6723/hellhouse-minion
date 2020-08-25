const { Users } = require('../Mongo').models

exports.handleMessage = async (client, msg) => {
  const userid = msg.author.id
  const user = await Users.findOne({ id: userid })
  console.log(user)
}
