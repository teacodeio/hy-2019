export default function attachKind () {
  return async context => {
    const data = await context.service.get(context.id)
    if (data.type) {
      context.params.query = { type: data.type }
    }
  }
}
