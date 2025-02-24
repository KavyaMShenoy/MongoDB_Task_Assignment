const States = require('../models/stateModel');
const Districts = require('../models/districtModel');

// Add a new state with population and area details.
exports.createStates = async (req, res, next) => {
    try {

        const { name, population, area } = req.body;

        const isStateExist = await States.findOne({ name: new RegExp('^' + name + '$', 'i') });

        if (isStateExist) {
            return res.status(400).json({ message: 'State already exists.', success: false })
        }

        const newState = new States({ name, population, area });

        await newState.save();

        res.status(201).json({ message: 'State created successfully.', success: true, data: newState });

    } catch (error) {

        next(error);

    }
}

// Add a new district, linking it to a specific state using its state_id.
exports.createDistricts = async (req, res, next) => {
    try {

        const { name, population, state_id } = req.body;

        const newStateCollection = await States.aggregate([
            {
                $addFields: {
                    new_id: { $toString: "$_id" }
                }
            }
        ]);

        const isStateExist = newStateCollection.find((state) => state.new_id === state_id);

        if (!isStateExist) {
            return res.status(404).json({ message: "State not found.", success: false })
        }

        const isDistrictExist = await Districts.findOne({ name: new RegExp('^' + name + '$', 'i'), state_id: state_id });

        if (isDistrictExist) {
            return res.status(400).json({ message: 'District already exists in the given state.', success: false })
        }

        const newDistrict = new Districts({ name, population, state_id });

        await newDistrict.save();

        res.status(201).json({ message: 'District created successfully.', success: true, data: newDistrict });

    } catch (error) {

        next(error);

    }
}

// Get the population of a specific state by name.
exports.fetchStatePopulationByName = async (req, res, next) => {
    try {

        const name = req.params.name;

        const state = await States.findOne({ name: new RegExp('^' + name + '$', 'i') });

        if (!state) {
            return res.status(404).json({ message: 'State not found.', success: false })
        }

        res.status(200).json({ population: state.population, success: true });

    } catch (error) {

        next(error);

    }
}

// Update the population of a specific district.
exports.updateDistrictPopulation = async (req, res, next) => {
    const { population } = req.body;

    if (!population || population <= 0) {
        return res.status(400).json({ message: 'Please provide the valid new population value.', success: false })
    }

    try {

        const name = req.params.name;

        const isDistrictFound = await Districts.findOne({ name: new RegExp('^' + name + '$', 'i') });

        if (!isDistrictFound) {
            return res.status(404).json({ message: 'District not found.', success: false })
        }

        const updatedDistrict = await Districts.findOneAndUpdate({ name: new RegExp('^' + name + '$', 'i') }, { $set: { population: population } }, { new: true });

        res.status(200).json({ message: 'District population updated successfully.', success: true, data: updatedDistrict });

    } catch (error) {

        next(error);

    }
}

// Remove a district by name.
exports.deleteDistrictByName = async (req, res, next) => {
    try {

        const name = req.params.name;

        const deletedDistrict = await Districts.findOneAndDelete({ name: new RegExp('^' + name + '$', 'i') });

        if (!deletedDistrict) {
            return res.status(404).json({ message: 'District not found.', success: false })
        }

        res.status(200).json({ message: 'District deleted successfully.', success: true });

    } catch (error) {

        next(error);

    }
}

// Calculate the sum of populations of all states.
exports.statesTotalPopulation = async (req, res, next) => {
    try {

        const allStates = await States.find();

        if (allStates.length === 0) {
            return res.status(404).json({ message: 'States not found.', success: false });
        }

        const totalPopulation = allStates.reduce((sum, state) => sum + state.population, 0);

        res.status(200).json({ totalPopulation: totalPopulation });

    } catch (error) {

        next(error);

    }
}

// Aggregate districts by state and calculate total population for each state, sorted by population in descending order.
exports.groupDistricts = async (req, res, next) => {
    try {

        const groupedDistrictsData = await Districts.aggregate([
            { $group: { _id: '$state_id', totalPopulation: { $sum: '$population' } } },
            { $lookup: { from: 'states', localField: '_id', foreignField: '_id', as: 'stateDetails' } },
            { $unwind: '$stateDetails' },
            { $project: { state: '$stateDetails.name', totalPopulation: 1 } },
            { $sort: { totalPopulation: -1 } }

        ]);

        if (groupedDistrictsData.length === 0) {
            res.status(404).json({ message: 'No districts found.', success: false });
        }

        res.status(200).json(groupedDistrictsData);

    } catch (error) {

        next(error);

    }
}

// Join district data with their corresponding state details. 
exports.joinDistrictwithTheirStates = async (req, res, next) => {
    try {
        const districtwithTheirStates = await Districts.find().populate('state_id');

        if (districtwithTheirStates.length === 0) {
            res.status(404).json({ message: 'No districts found.', success: false });
        }

        res.status(200).json(districtwithTheirStates);

    } catch (error) {

        next(error);

    }
}

// Calculate the average population density (population/area) for each state.
exports.statesAverageDensity = async (req, res, next) => {
    try {

        const allStates = await States.find();

        if (allStates.length === 0) {
            return res.status(404).json({ message: 'States not found.', success: false });
        }

        const statePopulationDensity = allStates.map((state) => ({
            name: state.name,
            population_density: (state.area > 0 && state.population > 0) ? ((state.population) / (state.area)).toFixed(2) : 'null'
        }))

        res.status(200).json(statePopulationDensity);

    } catch (error) {

        next(error);

    }
}

// Fetch the details of all states in the database.
exports.fetchAllStates = async (req, res, next) => {
    try {

        const allStatesData = await States.find();

        if (allStatesData.length === 0) {
            return res.status(404).json({ message: 'States not found.', success: false })
        }

        res.status(200).json({ data: allStatesData, success: true });

    } catch (error) {

        next(error);

    }
}

// Fetch the details of all districts in the database.
exports.fetchAllDistricts = async (req, res, next) => {
    try {

        const allDistrictsData = await Districts.find();

        if (allDistrictsData.length === 0) {
            return res.status(404).json({ message: 'Districts not found.', success: false })
        }

        res.status(200).json({ data: allDistrictsData, success: true });

    } catch (error) {

        next(error);

    }
}

