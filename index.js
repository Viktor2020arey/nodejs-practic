const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

(async () => {
  const argv = program.opts();

  // (async () => {
  //   try {
  // const products = await listContacts();
  // console.log(products);
  // const id = 12;
  // const oneProduct = await getContactById(id);
  // console.log(oneProduct);
  // const id = 9;
  // const delContact = await removeContact(id);
  // console.log(delContact);
  // const newContact = await addContact("Mago", "mango@gmail.com", "322-22-22");
  // console.log(newContact);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // })();

  // TODO: рефакторить
  const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case "list":
        const products = await listContacts();
        console.table(products);

        break;

      case "get":
        const getContact = await getContactById(id);
        console.table(getContact);

        break;

      case "add":
        await addContact(name, email, phone);
        const newContacts = await listContacts();
        console.table(newContacts);

        break;

      case "remove":
        await removeContact(id);
        const newContacts = await listContacts();
        console.table(newContacts);

        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  };

  await invokeAction(argv);
})();
