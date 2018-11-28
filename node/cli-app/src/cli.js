const { prisma } = require('./generated/prisma-client')

const TodoCommand = async () => {
  if (process.argv.length <= 2) {
    return 'Please provide a valid Todo command: `list`, `add`, `delete`. For example: `npm run cli add Groceries`'
  }

  const command = process.argv[2]
  if (!['list', 'add', 'delete'].includes(command)) {
    throw new Error(
      'Please provide a valid Todo command: `list`, `add`, `delete`. For example: `npm run cli add Groceries`',
    )
  }

  if (command === 'list') {
    const todoes = await prisma.todoes()

    if (todoes.length === 0) {
      return 'Nothing in TODO list, please use the `add` command to add a new TODO. For example: `npm run cli add Groceries`'
    }
    return todoes.reduce((acc, todo) => `${acc}  ${todo.title}\n`, '')
  }

  if (command === 'add' || command === 'delete') {
    if (process.argv.length <= 3) {
      throw new Error(
        'Please provide a TODO text when using the `add`/`delete` commands. For example: `npm run cli add Groceries`',
      )
    }
    const string_arguments = process.argv.slice(3)
    const title = string_arguments.reduce(
      (acc, arg) => acc + arg.trim() + ' ',
      '',
    )
    let response = null

    if (command === 'add') {
      response = await prisma.createTodo({
        title,
      })
    }

    if (command === 'delete') {
      response = await prisma.deleteTodo({
        title,
      })
    }

    return `Todo ${command}: ${title}`
  }
}

TodoCommand()
  .then(response => console.log(response))
  .catch(err => console.log(err.toString()))
