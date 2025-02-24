const mongoose = require('mongoose');

const state1Id = new mongoose.Types.ObjectId();
const state2Id = new mongoose.Types.ObjectId();
const state3Id = new mongoose.Types.ObjectId();

exports.statesData = [
  {
    "_id": state1Id,
    "name": "Kerala",
    "population": 35000000,
    "area": 38863
  },
  {
    "_id": state2Id,
    "name": "Karnataka",
    "population": 61130704,
    "area": 191791
  },
  {
    "_id": state3Id,
    "name": "Tamilnadu",
    "population": 72147030,
    "area": 130058
  }
];

exports.districtData = [
  {
    "name": "Ernakulam",
    "population": 3282388,
    "state_id": state1Id
  },
  {
    "name": "Udupi",
    "population": 1177361,
    "state_id": state2Id
  },
  {
    "name": "Chennai",
    "population": 12658000,
    "state_id": state3Id
  },
  {
    "name": "Trivandrum",
    "population": 957730,
    "state_id": state1Id
  },
  {
    "name": "Madurai",
    "population": 3038252,
    "state_id": state3Id
  },
  {
    "name": "Mysore",
    "population": 1316460,
    "state_id": state2Id
  },
  {
    "name": "Trissur",
    "population": 3243170,
    "state_id": state1Id
  }
];