const router = require("express").Router();
const Message = require("../models/Message");

// add
router.post("/", async (req, res) => {
  const newMessage = await Message(req.body);

  try {
    const sendMessage = await newMessage.save();
    res.status(200).json(sendMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get
router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.send(500).json(error);
  }
});

module.exports = router;
