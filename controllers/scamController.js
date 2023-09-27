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

const addScamCase = async (req, res) => {
const scamCase  = req.body

  try {
    // Create a new scam case with the country code
    await ScamCase.create({
      ...scamCase
    });

    res.status(200).send("scamAdded", { message: "Scam case added successfully" }); // Render a success view
  } catch (error) {
    console.log('Error adding a new scam: ', error);
    res.status(500).send({error: "Internal server error"})
  }
};

module.exports = {getAllScams, addScamCase}