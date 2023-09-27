const ScamCase = require("../models/ScamCase");

const updateIsThereRating = async (req, res) => {
  const { isConfirmed } = req.body;
  const scamId = req.params.scamId;

  try {
    const scam = await ScamCase.findById(scamId);
    
    if (!scam) {
        return res.status(404).json({ message: "ScamCase not found" });
    }
    
    if (!scam.isThereRating) {
        scam.isThereRating = {
            confirmed: 0,
            all: 0,
        };
    }
    
    const { confirmed, all } = scam.isThereRating; // Destructure after checking if it exists
    
    scam.isThereRating = {
        all: all + 1,
        confirmed: confirmed + isConfirmed, // Increment confirmed based on isConfirmed
    };
    console.log('scam: ', scam);
    
    const updatedScam = await scam.save();
    if (
        updatedScam.isThereRating.all > 5 &&
        updatedScam.isThereRating.confirmed / updatedScam.isThereRating.all < 0.2
        ) {
            await scam.deleteOne();
            return res
            .status(200)
            .json({ success: true, message: "ScamCase deleted" });
        }

    res.status(200).json({ success: true, data: updatedScam });
  } catch (error) {
    console.error("Error updating IsThereRating:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { updateIsThereRating };
