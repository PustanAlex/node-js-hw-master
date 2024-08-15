const mongoose = require('mongoose');

const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
};


const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        set: formatPhoneNumber, 
        validate: {
            validator: function(value) {
                return /\(\d{3}\) \d{3}-\d{4}/.test(value);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    favorite: {
        type: Boolean,
        default: false,
    }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
