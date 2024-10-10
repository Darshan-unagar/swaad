// webpack.config.js
module.exports = {
    // other configuration options...
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
        },
    },
};
