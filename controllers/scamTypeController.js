const ScamType = require("../models/ScamType");

const getScamTypes = async (req, res) => {
    console.log('scamTypes:');
  try {
    const scamTypes = await ScamType.find();
    console.log(scamTypes);
    // Send the scam types as a JSON response
    res.status(200).json({ success: true, data: scamTypes });
  } catch (error) {
    console.error("Error fetching scam types:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = {getScamTypes}

