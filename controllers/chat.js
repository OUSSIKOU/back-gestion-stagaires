const Chat = require("../models/chat");

exports.createChat = async (req, res) => {
  try {
    console.log("req.body.recipientId", req.body.recipientId);
    console.log("req.auth.userId", req.auth.userId, req.body.message);

    const newChat = new Chat({
      participants: [req.auth.userId, req.body.recipientId],
      messages: [
        {
          sender: req.auth.userId,
          content: req.body.message,
        },
      ],
    });
    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res
      .status(500)
      .json({ error: "Failed to create chat.", details: error.message });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.auth.userId });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve chats." });
  }
};

exports.getById = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }
    if (!chat.participants.includes(req.auth.userId)) {
      return res.status(403).json({ error: "Access denied." });
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve chat." });
  }
};

exports.updateChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }
    if (!chat.participants.includes(req.auth.userId)) {
      return res.status(403).json({ error: "Access denied." });
    }
    chat.messages.push({
      sender: req.auth.userId,
      content: req.body.message,
    });
    const updatedChat = await chat.save();
    res.status(200).json(updatedChat);
  } catch (error) {
    res.status(500).json({ error: "Failed to update chat." });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }
    if (!chat.participants.includes(req.auth.userId)) {
      return res.status(403).json({ error: "Access denied." });
    }
    await chat.remove();
    res.status(200).json({ message: "Chat deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete chat." });
  }
};
