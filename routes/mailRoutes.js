const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {SendMail} = require("../controllers/mailController");

const router = express.Router();

router.post('/send-mail', authMiddleware,SendMail);

module.exports = router;