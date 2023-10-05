// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";

// // const contactPath = path.resolve("models", "contacts.json");

// const listContacts = async () => {
//   const buffer = await fs.readFile(contactPath);
//   return JSON.parse(buffer);
// };

// const getContactById = async (contactId) => {
//   const contacts = await listContacts();
//   const result = contacts.find((contact) => contact.id === contactId);
//   return result || null;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const contactIndex = contacts.findIndex((cont) => cont.id === contactId);
//   if (contactIndex === -1) {
//     return null;
//   }

//   const [result] = contacts.splice(contactIndex, 1);
//   await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
//   return result;
// };

// const addContact = async (body) => {
//   const { name, email, phone } = body;
//   const contacts = await listContacts();
//   const newContact = { id: nanoid(), name, email, phone };
//   contacts.push(newContact);

//   await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const updateContact = async (contactId, body) => {
//   const { name, email, phone } = body;
//   const contacts = await listContacts();
//   const index = contacts.findIndex((contact) => contact.id === contactId);

//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id: contactId, name, email, phone };
//   await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
//   return contacts[index];
// };
// export default {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// // };
// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const cats = new Schema({
//   nickname: {
//     type: String,
//     minlength: 2,
//     maxlength: 7,
//     required: [true, "Nickname is required"],
//   },
//   age: {
//     type: Number,
//     min: 1,
//     max: 50,
//   },
//   owner: {
//     name: String,
//     address: [String],
//     birthday: Date,
//   },
// });

// cats.index({ nickname: 1 });

// const Cat = mongoose.model("cat", cats);
// Cat.getIndexes((err, indexes) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(indexes);
//   }
// });

// const cat = new Cat({
//   nickname: "Barsik",
//   age: 1,
// });

// console.log(cat);
