const express = require('express');

const router = express.Router();

const districtsStatesController = require('../controllers/districtsStatesController');

const stateValidationMiddleware = require('../middlewares/stateValidationMiddleware');
const districtValidationMiddleware = require('../middlewares/districtValidationMiddleware');


router.post('/states', stateValidationMiddleware, districtsStatesController.createStates);


router.post('/districts', districtValidationMiddleware, districtsStatesController.createDistricts);


router.get('/states/:name/population', districtsStatesController.fetchStatePopulationByName);


router.put('/districts/:name/population', districtsStatesController.updateDistrictPopulation);


router.delete('/districts/:name', districtsStatesController.deleteDistrictByName);


router.get('/states/total-population', districtsStatesController.statesTotalPopulation);


router.get('/districts/group-by-state', districtsStatesController.groupDistricts);


router.get('/districts/with-states', districtsStatesController.joinDistrictwithTheirStates);


router.get('/states/average-density', districtsStatesController.statesAverageDensity);


router.get('/states', districtsStatesController.fetchAllStates);


router.get('/districts', districtsStatesController.fetchAllDistricts);


module.exports = router;