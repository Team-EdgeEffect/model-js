import { Model } from "@edge-effect/model-js";

export default class SampleModel extends Model {
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
