const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const selectContact = contacts.find((contact) => contact.id === +contactId);
    if (!selectContact) {
      throw new Error(`Контакт с id=${contactId} не найден `);
    }
    return selectContact;
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === +contactId);
    if (idx === -1) {
      throw new Error(`Контакт с id=${contactId} не найден `);
    }
    const newContacts = contacts.filter((contact) => contact.id !== +contactId);
    const newContactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, newContactsString);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const nameContact = contacts.find((contact) => contact.name === name);
    if (nameContact) {
      throw new Error(`Контакт с именем ${name} уже существует `);
    }
    const id = Math.max(...contacts.map(({ id }) => id)) + 1;
    const addContact = { id, name, email, phone };
    const newContacts = [...contacts, addContact];
    const newContactsString = JSON.stringify(newContacts);
    await fs.writeFile(contactsPath, newContactsString);
    return addContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
