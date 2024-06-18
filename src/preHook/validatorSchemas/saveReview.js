export default {
    $async: true,
    type: "object",
    properties: {
        movieId: {
            type: "string"
        },
        review: {
            type: "string",
            minLength: 1
        },
        user: {
            type: "string",
            minLength: 3,
            maxLength: 20
        }
    },
    required: ["movieId", "review", "user"],
};
