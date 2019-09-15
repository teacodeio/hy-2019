export default function removeFieldFromData (idKey = 'id') {
  return context => {
    if (context.data && context.data[idKey]) {
      delete context.data[idKey]
    }
  }
}
