import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
// Compare passwords
customerSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Find customer by email and password
customerSchema.statics.findByCredentials = async function(email, password) {
    const customer = await Customer.findOne({ email });
    if (!customer) {
        throw new Error('Invalid login credentials');
    }

    const isPasswordMatch = await customer.comparePassword(password);

    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials');
    }

    return customer;
};

// Hash password before saving
customerSchema.pre('save', async function(next) {
    const customer = this;

    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 10);
    }

    next();
});

// const Customer = mongoose.model('Customer', customerSchema);
export const Customer = mongoose.model("Customer", customerSchema);
