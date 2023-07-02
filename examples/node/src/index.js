const { isResponseError, isResponseSuccess } = require("@edge-effect/model-js");
const PostModel = require("./model/PostModel");

function toFriendly(data) {
    const isArrayData = Array.isArray(data);
    const posts = isArrayData ? [...data] : [data];
    const postSize = posts.length;
    let result = "";
    let index = 0;
    for (const post of posts) {
        result += `{ userId: ${post.userId}, id: ${post.id}, title: ${post.title}, body: ${post.body} }`;
        if (index < postSize - 1) {
            result += ", ";
        }
        index++;
    }
    return isArrayData ? `[ ${result} ]` : result;
}

async function doJob(onRequestJob) {
    return await onRequestJob();
}

async function main() {
    console.log("model-js-example-node");
    let postModel = new PostModel();
    console.log(
        `request example 1: ${await doJob(async () => {
            let result = null;
            const response = await postModel.getPost(1);
            if (isResponseSuccess(response)) {
                const content = response.content;
                result = `Success: ${toFriendly(content)}`;
            } else if (isResponseError(response)) {
                result = `Exception raised: ${response.detail.message}`;
            } else {
                return "Cases that do not require handling";
            }
            return result;
        })}`
    );
    console.log(
        `request example 2: ${await doJob(async () => {
            let result = null;
            const response = await postModel.getPosts();
            if (isResponseSuccess(response)) {
                const content = response.content;
                result = `Success: ${toFriendly(content)}`;
            } else if (isResponseError(response)) {
                result = `Exception raised: ${response.detail.message}`;
            } else {
                return "Cases that do not require handling";
            }
            return result;
        })}`
    );
}

main();
