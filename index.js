const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

(async () => {
  try {
    // const products = await listContacts();
    // console.log(products);
    // const id = 12;
    // const oneProduct = await getContactById(id);
    // console.log(oneProduct);
    // const id = 9;
    // const delContact = await removeContact(id);
    // console.log(delContact);
    const newContact = await addContact("Mago", "mango@gmail.com", "322-22-22");
    console.log(newContact);
  } catch (error) {
    console.log(error.message);
  }
})();
