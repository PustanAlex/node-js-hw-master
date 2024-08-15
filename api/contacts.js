const express = require('express');
const router = express.Router();
const { listContacts, getById, getByFavorite, updateStatusContact, addContact, updateContact, removeContact } = require('./helpers');
const Joi = require("joi");
const Contact = require('../models/moongoseItemSchema');


const joiContactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getById(req.params.contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiContactSchema.validate(req.body);
    if (error) return res.status(400).json({message: error.message})

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

// TODO: Get by favorite not working
router.get('/favorites', async (req, res, next) => {
  try {
    const favoriteContacts = await getByFavorite();
    res.status(200).json(favoriteContacts);
  } catch (error) {
    next(error);
  }
});


router.put('/:contactId', async (req, res, next) => {

  const existingContact = await Contact.findById(req.params.contactId)
  if (!existingContact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  const updatedData = {
    name: req.body.name || existingContact.name,
    email: req.body.email || existingContact.email,
    phone: req.body.phone || existingContact.phone,
  }

  try {
    const { error } = joiContactSchema.validate(updatedData);
    if (error) return res.status(400).json({message: error.message})

    const updatedContact = await updateContact(req.params.contactId, updatedData);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req.params.contactId);
    if (deletedContact) {
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: "missing field favorite" });
    }

    const updatedContact = await updateStatusContact(contactId, { favorite });

    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
