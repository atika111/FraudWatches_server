// scamsRoutes.js
const express = require("express");
const ScamCase = require("../models/ScamCase");

// GET all scams
const getAllScams = async (req, res) => {
  try {
    const scams = await ScamCase.find();
    res.status(200).send(scams);
  } catch (error) {
    console.log('Error getting all scams: ', error);
    res.status(500).send({error: "Internal server error"})
  }
};

module.exports = {getAllScams}