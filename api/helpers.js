const Contact = require("../models/moongoseItemSchema");

const listContacts = async () => {
  return await Contact.find();
};

const getById = async (id) => {
  return await Contact.findById(id);
};

const addContact = async (contact) => {
  const newContact = new Contact(contact);
  return await newContact.save();
};

const getByFavorite = async () => {
    return await Contact.find( {favorite: true });
  }

const updateContact = async (id, updatedInfo) => {
  return await Contact.findByIdAndUpdate(id, updatedInfo, { new: true });
};

const removeContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

const updateStatusContact = async (contactId, { favorite }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: favorite },
    { new: true }
  );
  return updatedContact;
};


module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
  updateStatusContact,
  getByFavorite,
};
