const youtube = require('./youtube/youtube-comments');
const twitch = require('./twitch/twitch-chat');
const config = require('./config/bot-config');

/**
 * Async wait
 */
const wait = async (ms) => new Promise((res, rej) => {
    setTimeout(() => res(), ms);
});

/**
 * Random value from the specified array
 */
const randomFrom = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * Application entry point
 */
const main = async () => {
    // -- Load YouTube Comments for Configured Video Ids
    const requiredPhrases = config.youtube.comments.requiredPhrases
        .map(phrase => phrase.toLowerCase());
    const requiredLength = config.youtube.comments.requiredLength;
    const videoIds = config.youtube.videoIds;

    youtube.init(config.youtube.apiKey);

    const comments = await youtube.comments({ 
        videoIds,
        requiredPhrases, 
        requiredLength 
    });

    console.log(`Successfully loaded ${comments.length} comments from ${videoIds.length} videos.`);
    
    // -- Connect to Twitch
    await twitch.connect({ 
        user: config.twitch.username,
        oauthToken: config.twitch.token,
        channel: config.twitch.channel
    });

    // -- Run Loop Selecting random comment index and chatting
    const minChatInterval = config.twitch.chat.min * 1000;
    const maxChatInterval = (config.twitch.chat.max * 1000) - minChatInterval;

    while(true) {
        const comment = randomFrom(comments);

        await twitch.chat({ text: comment });

        const nextWait = minChatInterval + Math.floor(Math.random() * maxChatInterval);
        console.log(`Waiting ${nextWait / 1000} seconds...`);
        await wait(nextWait);
    }
};

main().then(console.log).catch(console.error);
