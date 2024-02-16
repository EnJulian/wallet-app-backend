import mongoose, { Schema } from 'mongoose'
// import validator from 'validator'

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'provide a name'],
    index: true
  },
  surname: {
    type: String,
    required: [true, 'provide a name'],
    index: true
  },
  othernames: {
    type: String,
    required: false,
    index: true,
    default: ''
  },
  phonenumber: {
    type: String,
    required: [true, 'provide phone number'],
    index: true

  },
  password: {
    type: String,
    required: true,
    select: true,
    minlength: [8, 'the password require more than 8 characters']
  },
  
  resetToken: {
    type: String,
    index: true
  },
  expireToken: {
    type: String,
    index: true
  },

  resetPasswordExpires: {
    type: String,
    index: true
  },

  resetPasswordToken: {
    type: String,
    index: true
  },


  email: {
    type: String,
    lowercase: true,
    required: [true, 'provide email'],
    unique: true,
    index: true
  },

  accountNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  DollarWallet: {
    type: Number,
    default: 0
  },
  NairaWallet: {
    type: Number,
    default: 0
  },
  pin: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  
})


// export default UserSchema;
export default mongoose.model('User', userSchema)
