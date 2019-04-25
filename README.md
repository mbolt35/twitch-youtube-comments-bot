# Twitch YouTube Comments Bot
Twitch bot implementation which will post YouTube comments from configured videos based on specific word or phrase criteria. 

---- 

### Setup
To run this bot either locally or on a remote host, you'll need to acquire:

#### YouTube API Key
You can get an API key by going to the [Google Developer Console](https://console.developers.google.com/apis/dashboard), creating a new API project, and then using the Credentials tab to generate a new API key for the project. 

#### Twitch Bot User and OAuth Token
Create a new (or use an existing) Twitch user, login, and then navigate to: [https://twitchapps.com/tmi/](https://twitchapps.com/tmi) which can retrieve an oauth token for the twitch user.

#### YouTube Video IDs
To find the id for a specific YouTube video, go to the URL on YouTube. You should see a `v` query parameter `?v=[video_id]`. 

---- 

### Configuration
Summary on configuring and running the bot.

#### Production
In the `./config/env/` directory, there is a single `production.js` configuration which uses environment variables to import the configuration values. This is optimal for running as a part of a webserver or remote host where environment variables can easily be configured by the host service. 

#### Local
Probably the more common scenario for running this bot will be locally. The fastest way to set this up is to copy `./config/env/production.js` and paste it as `./config/env/local.js`. Whenever the `local.js` file exists, it will automatically be used instead of `production.js`. After creating `local.js`, replace the `process.env` values for each configuration with your own. 

#### Example
```
module.exports = {

    // Twitch Configuration
    twitch: {
        
        // Bot Username
        username: '<TWITCH BOT USERNAME HERE>',

        // OAuth Token - https://twitchapps.com/tmi/
        token: '<TWITCH OAUTH HERE>',

        // Channel to Join
        channel: '#<TWITCH CHANNEL HERE>',

        // Chat Interval
        chat: {
            
            // The minimum amount of time to wait after chatting (seconds)
            // Default: 5 minutes
            min: 300,

            // The maximum amount of time to wait after chatting (seconds)
            // Default: 10 minutes
            max: 600
        }
    },

    // YouTube Configuration
    youtube: {
        
        // YouTube API Key
        apiKey: '<YOUTUBE APIKEY HERE>',

        // Video Identifiers to retrieve comments for
        videoIds: [ '<VIDEO ID 1 HERE>', '<VIDEO ID 2 HERE>', '<VIDEO ID 3 HERE>' ],

        // Comments Filter
        comments: {

            // Required words or phrases
            requiredPhrases: [ 'cheat', 'hack', 'glitch', 'trash', 'garbage' ],

            // Required Length of Comment (# characters)
            requiredLength: 20
        }
    }
};
```

----

### Run
```
$ cd twitch-youtube-comments-bot
$ npm install
$ node bot.js
```
