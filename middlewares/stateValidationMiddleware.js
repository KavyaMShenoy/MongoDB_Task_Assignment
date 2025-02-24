const stateValidationMiddleware = (req, res, next) => {
    const { name, population, area } = req.body;

    if (!name || !population || !area) {
        return res.status(400).json({ message: 'State name, population and area are required.' });
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

    if (typeof area === 'string') {
        return res.status(400).json({ message: "Area should not be a string." });
    }

    if (isNaN(area) || area <= 0) {
        return res.status(400).json({ message: "Invalid Area." });
    }

    next();
}


module.exports = stateValidationMiddleware;