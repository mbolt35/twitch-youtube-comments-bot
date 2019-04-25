const tmi = require('tmi.js');

// Twitch Client
let twitch;
let channelName;

module.exports = {

    /**
     * Initializes the twitch client using the provided login information.
     */
    connect: async ({ user, oauthToken, channel }) => {
        channelName = channel;

        twitch = new tmi.client({
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: user,
                password: oauthToken
            },
            channels: [ channelName ]
        });

        await twitch.connect();
    },

    /**
     * Chats in the main channel.
     */
    chat: async ({ text }) => {
        await twitch.say(channelName, text);
    }

};