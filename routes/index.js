const express = require('express');

const router = express.Router();

const Producer = require('../lib/producer.js');

router.get('/', (req, res) => {
  res.render('index');
});

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

  producer.sendMessage(messageObject, (err, ok) => {
    console.log(err, ok);
    if (err !== null) {
      res.status(500);
    } else {
      res.json({ status: 200 });
    }
  });
});

module.exports = router;
