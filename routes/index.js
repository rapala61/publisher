const express = require('express');

const router = express.Router();

const Producer = require('../lib/producer.js');

/**
 * Renders our form
 */
router.get('/', (req, res) => {
  res.render('index');
});

/**
 * This route receives the form submission request
 */
router.post('/', (req, res) => {
  const payload = {
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    cell: req.body.cell,
    password: req.body.password,
    password_confirm: req.body.password_confirm
  };

  const producer = new Producer();
  const exchange = 'form_submission';
  const key = 'sign_up';
  const messageObject = {
    exchange,
    routingKey: key,
    payload: JSON.stringify(payload),
    options: {
      contentType: 'aplication/json',
      timestamp: Date.now()
    }
  };

  /**
   * Use the producer instance to send the message to the bus.
   * The callback will redirect user to the form on success
   */
  producer.sendMessage(messageObject, (err, ok) => {
    if (err !== null) {
      res.status(500);
    } else {
      res.redirect('/?submission=ok');
    }
  });
});

module.exports = router;
