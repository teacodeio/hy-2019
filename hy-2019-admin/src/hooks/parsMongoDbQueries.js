const _queryTypes = [
  '$regex',
  '$gt',
  '$lt',
  '$gte',
  '$lte'
]

export default function parsMongoDbQueries (queryTypes = _queryTypes) {
  return async context => {
    if (context.params.query) {
      queryTypes.forEach(
        queryType => {
          const queryTypeWithDot = `.${queryType}`
          Object.keys(context.params.query)
            .filter(
              key => key.includes(queryTypeWithDot)
            )
            .forEach(
              key => {
                const q = context.params.query[key]
                delete context.params.query[key]
                const newKey = key.replace(queryTypeWithDot, '')
                context.params.query[newKey] = {
                  [queryType]: q
                }
              }
            )
        }
      )
    }
  }
}
