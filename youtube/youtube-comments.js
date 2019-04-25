const youtube = require('googleapis').google.youtube('v3');

/**
 * Async list comment threads for a specific video.
 */
const listComments = async (params) => new Promise((res, rej) => {
    youtube.commentThreads.list(params, (err, response) => {
        if (err) {
            rej(err);
            return;
        }

        res(response);
    });
});


const loadCommentsFor = async ({ videoId, requiredPhrases, requiredLength }) => {
    const comments = [];

    let nextPage = '';
    while(true) {
        let response;
        try {
            response = await listComments({
                part: 'snippet',
                key: apiKey,
                textFormat: 'plainText',
                videoId,
                maxResults: 100,
                pageToken: nextPage
            });
        } catch(error) {
            console.log(`Error: ${error}`);
            break;
        }

        const items = response.data.items;
        for (const item of items) {
            const snippet = item.snippet.topLevelComment.snippet;
            const author = snippet.authorDisplayName;
            const comment = snippet.textOriginal;
            const lcase = comment.toLowerCase();

            if (comment.length < requiredLength) {
                continue;
            }

            if (!requiredPhrases.some(phrase => lcase.includes(phrase))) {
                continue;
            }

            comments.push(comment);
        }
        
        nextPage = response.data.nextPageToken;
        if (!nextPage) {
            break;
        }
    }

    return comments;
};

// API Key passed via init
let apiKey;

module.exports = {

    /**
     * Initializes the youtube APIs with a google API key.
     */
    init: googleApiKey => apiKey = googleApiKey,

    /**
     * Loads all comments for provided video identifiers given they match specific filter parameters.
     */
    comments: async ({ videoIds, requiredPhrases, requiredLength }) => {
        let allComments = [];

        const commentTasks = videoIds.map(videoId => loadCommentsFor({ videoId, requiredPhrases, requiredLength }));
        const comments = await Promise.all(commentTasks);
        comments.forEach(arr => allComments = allComments.concat(arr));

        return allComments;
    }
};