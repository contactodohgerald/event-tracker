const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const UserSchema = new Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password:  { type: String, required: true },
        deletedAt: { type: Date, default: null },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);


// hashin the password
UserSchema.pre('save',  async function(next){
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next()
})

// comparing the password
UserSchema.methods.comparePassword=  async function(password, userPassword) {
    return await bcrypt.compare(password, userPassword)
}

module.exports = mongoose.model('User', UserSchema);