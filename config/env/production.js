module.exports = {

    // Twitch Configuration
    twitch: {
        
        // Bot Username
        username: process.env.TWITCH_USER,

        // OAuth Token - https://twitchapps.com/tmi/
        token: process.env.TWITCH_OAUTH,

        // Channel to Join
        channel: process.env.TWITCH_CHANNEL,

        // Chat Interval
        chat: {
            
            // The minimum amount of time to wait after chatting (seconds)
            min: 300,

            // The maximum amount of time to wait after chatting (seconds)
            max: 600
        }
    },

    // YouTube Configuration
    youtube: {
        
        // YouTube API Key
        apiKey: process.env.YOUTUBE_APIKEY,

        // Video Identifiers to retrieve comments for
        videoIds: (process.env.YOUTUBE_VIDEOS || '').split(','),

        // Comments Filter
        comments: {

            // Required words or phrases
            requiredPhrases: (process.env.YOUTUBE_COMMENT_PHRASES || '').split(','),

            // Required Length of Comment (# characters)
            requiredLength: 20
        }
    }
};