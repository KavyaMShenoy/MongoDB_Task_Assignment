const { default: mongoose } = require('mongoose');

const States = require('../models/stateModel');
const Districts = require('../models/districtModel');

const districtStatesData = require('../districtStatesData');

async function insertDistrictsStatesData() {
    try {

        for (let state of districtStatesData.statesData) {
            const existingState = await States.findOne({ name: new RegExp('^' + state.name + '$', 'i') });

            if (!existingState) {
                await States.create(state);
                console.log(`State ${state.name} inserted successfully.`);
            } else {
                console.log(`State ${state.name} already exists.`);
            }
        }

        for (let district of districtStatesData.districtData) {
            const existingDistrict = await Districts.findOne({ name: new RegExp('^' + district.name + '$', 'i') });

            if (!existingDistrict) {
                await Districts.create(district);
                console.log(`District ${district.name} inserted successfully.`);
            } else {
                console.log(`District ${district.name} already exists.`);
            }
        }

    } catch (err) {
        console.error('Error inserting data:', err);
    }
}

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/districtsStates');
        console.log("DB connected successfully.")

        await insertDistrictsStatesData();
    } catch (error) {
        console.log("An error occured.", error.message);
    }
}

module.exports = connectDB;