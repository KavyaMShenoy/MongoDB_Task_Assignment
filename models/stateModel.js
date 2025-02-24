const { default: mongoose } = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    population: { type: Number, required: true },
    area: { type: Number, required: true }
});

const States = mongoose.model('States', stateSchema);

module.exports = States;