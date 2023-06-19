const { Model } = require("@edge-effect/model-js");

class SampleModel extends Model {
    getDomain() {
        return "https://jsonplaceholder.typicode.com";
    }

    async getPost(id) {
        return this.get({
            path: `posts/${id}`,
        });
    }

    async getPosts() {
        return this.get({
            path: "posts",
        });
    }
}

module.exports = SampleModel;
