// TODO: Refactor into a constructor
/* eslint arrow-body-style: ["error", "always"]*/

const amqp = require('amqplib');

class Publisher {
  constructor(uri, options = {}) {
    if (typeof uri === 'string' && uri.length) {
      this.uri = uri;
    } else {
      this.uri = process.env.AMQP_URL || 'amqp://localhost';
      // this.uri = 'amqp://localhost';
    }
    this.routingKey = options.routingKey || 'sign_up';
    this.exchangeType = options.exchangeType || 'direct';
    this.connection = amqp.connect(this.uri);
  }

  getChannel() {
    return this.connection.then((conn) => {
      return conn.createConfirmChannel();
    });
  }

  sendMessage(msgObj, callback) {
    const cb = (typeof callback === 'function') ? callback : () => {};
    this.getChannel().then((channel) => {
      channel.assertExchange(msgObj.exchange, this.exchangeType, { durable: true });
      channel.publish(msgObj.exchange, msgObj.routingKey || '', Buffer.from(msgObj.payload), msgObj.options, cb);
    });
  }
}

module.exports = Publisher;
