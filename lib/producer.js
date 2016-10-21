/* eslint arrow-body-style: ["error", "always"]*/

const amqp = require('amqplib');

/**
 * Represents the amqplib API as a Producer class
 */
class Producer {
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

  /**
   * Creates a confirm channel for the publishing of messages
   * @return {Promise}
   * @resolve {Channel}
   */
  getChannel() {
    return this.connection.then((conn) => {
      return conn.createConfirmChannel();
    });
  }

  /**
   * Publishes a message to the message bus
   * @param {Object} exchange, exchangeType, payload, routingKey, options
   * @param {function} called after the channel confirms receipt of message
   */
  sendMessage(msgObj, callback) {
    const cb = (typeof callback === 'function') ? callback : () => {};
    this.getChannel().then((channel) => {
      channel.assertExchange(msgObj.exchange, this.exchangeType, { durable: true });
      channel.publish(msgObj.exchange, msgObj.routingKey || '', Buffer.from(msgObj.payload), msgObj.options, (err, ok) => {
        this.disconnect();
        cb(err, ok);
      });
    });
  }

  /**
   * Closes the connection to the message bus
   * @return {Promise}
   */
  disconnect() {
    return this.connection.then((conn) => {
      conn.close();
    });
  }
}

module.exports = Producer;
