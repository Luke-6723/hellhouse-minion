exports.channelTypes = {
  0: 'TEXT'
}

exports.serializeClass = async function (instance) {
  return JSON.stringify(instance)
}

exports.deserializeClass = async function (instance, obj) {
  var serializedObject = await JSON.parse(obj)
  await Object.assign(instance, serializedObject)
  instance.cached = true
  return instance
}
