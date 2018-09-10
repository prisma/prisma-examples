const { Prisma } = require("./generated");

const prisma = new Prisma();

const TodoCommand = async () => {
  if (process.argv.length <= 2) {
    throw new Error("Please provide a Todo command");
  }

  const command = process.argv[2];
  if (!["list", "add", "delete"].includes(command)) {
    throw new Error("Please provide a valid Todo command: list, add, delete");
  }

  if (command === "list") {
    const todoes = await prisma.todoes() || [];

    if (todoes.length === 0) {
      return "Nothing in Todo list, please use add command to add a Todo";
    }
    return todoes.reduce((acc, todo) => `${acc}  ${todo.title}\n`, "");
  }

  if (command === "add" || command === "delete") {
    if (process.argv.length <= 3) {
      throw new Error("Please provide a Todo text to add command");
    }
    const string_arguments = process.argv.slice(3);
    const title = string_arguments.reduce(
      (acc, arg) => acc + arg.trim() + " ",
      ""
    );
    let response = null;

    if (command === "add") {
      response = await prisma.createTodo({
        title
      });
    }

    if (command === "delete") {
      response = await prisma.deleteTodo({
        title
      });
    }

    return `Todo ${command}: ${title}`;
  }
};

TodoCommand()
  .then(response => console.log(response))
  .catch(err => console.log(err.toString()));
