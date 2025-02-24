const { default: mongoose } = require('mongoose');

const districtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    population: { type: Number, required: true },
    state_id: { type: mongoose.Schema.Types.ObjectId, ref: 'States', required: true }
});

const Districts = mongoose.model('Districts', districtSchema);

module.exports = Districts;