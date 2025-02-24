const { ObjectId } = require('mongodb');

const districtValidationMiddleware = (req, res, next) => {
    const { name, population, state_id } = req.body;

    if (!name || !population || !state_id) {
        return res.status(400).json({ message: 'District name, population and state_id are required.' });
    }

    if (typeof name !== 'string') {
        return res.status(400).json({ message: "Name should be a string." });
    }

    if (typeof population === 'string') {
        return res.status(400).json({ message: "Population should not be a string." });
    }

    if (isNaN(population) || population <= 0) {
        return res.status(400).json({ message: "Invalid Population." });
    }

    if (!ObjectId.isValid(state_id)) {
        return res.status(400).json({ message: "State Id is invalid." })
    }

    next();
}

module.exports = districtValidationMiddleware;