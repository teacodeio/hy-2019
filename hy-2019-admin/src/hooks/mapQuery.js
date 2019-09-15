const _config = [
  {
    field: 'createdAfter',
    mongoFiled: 'createdAt',
    parse: v => ({
      $gt: v
    }),
    merge: true
  },
  {
    field: 'createdBefore',
    mongoFiled: 'createdAt',
    parse: v => ({
      $lt: v
    }),
    merge: true
  },
  {
    field: 'updatedAfter',
    mongoFiled: 'updatedAt',
    parse: v => ({
      $gt: v
    }),
    merge: true
  },
  {
    field: 'updatedBefore',
    mongoFiled: 'updatedAt',
    parse: v => ({
      $lt: v
    }),
    merge: true
  }
]

export default function mapQuery (config = _config) {
  return async context => {
    if (context.params.query) {
      config.forEach(
        ({ field, mongoFiled, parse, ...option }) => {
          if (context.params.query[field]) {
            if (option.merge) {
              context.params.query[mongoFiled] = {
                ...context.params.query[mongoFiled],
                ...parse(context.params.query[field])
              }
            } else {
              context.params.query[mongoFiled] = parse(context.params.query[field])
            }

            delete context.params.query[field]
          }
        }
      )
    }
  }
}
