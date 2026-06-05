const mongoose = require('mongoose');
//this is model : the fundamental building block of our application, 
// It defines the structure of the data and how it will be stored in the database.
// It is a blueprint for creating documents in a MongoDB collection. 
// In this case, we are defining an Expense model that will represent an expense entry in our application. 
// Each expense will have an amount, category, date, and an optional note. 
// The model also includes validation rules to ensure that the data is consistent in database.
const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],//prevent 0 and -ve amounts
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'],
        message: '{VALUE} is not a valid category',
      },
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator: (value) => value <= new Date(),
        message: 'Date cannot be in the future',
      },
    },
    note: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true, // automatically manages dates
  }
);

module.exports = mongoose.model('Expense', expenseSchema);