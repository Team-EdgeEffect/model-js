import React, { useRef, useState } from "react";
import PostModel from "./model/PostModel";
import { isResponseError, isResponseSuccess } from "@edge-effect/model-js";
import { ResultRecord } from "./component/ResultRecord";
import { Post } from "./dto/PostDto";

function App() {
    const postModel = useRef<PostModel>(new PostModel());

    const toFriendly = (data: Post | ReadonlyArray<Post>) => {
        const isArrayData = Array.isArray(data);
        const posts: ReadonlyArray<Post> = isArrayData ? [...data] : [data];
        const postSize: number = posts.length;
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
    };

    return (
        <div className="App">
            <h1>model-js-example-react</h1>
            <section>
                <ResultRecord
                    title={"request example 1"}
                    onAction={async () => {
                        let result: string | null = null;
                        const response = await postModel.current.getPost(1);
                        if (isResponseSuccess(response)) {
                            const content = response.content;
                            result = `Success: ${toFriendly(content)}`;
                        } else if (isResponseError(response)) {
                            result = `Exception raised: ${response.detail.message}`;
                        } else {
                            return "Cases that do not require handling";
                        }
                        return result;
                    }}
                />
                <ResultRecord
                    title={"request example 2"}
                    onAction={async () => {
                        let result: string | null = null;
                        const response = await postModel.current.getPosts();
                        if (isResponseSuccess(response)) {
                            const content = response.content;
                            result = `Success: ${toFriendly(content)}`;
                        } else if (isResponseError(response)) {
                            result = `Exception raised: ${response.detail.message}`;
                        } else {
                            return "Cases that do not require handling";
                        }
                        return result;
                    }}
                />
            </section>
        </div>
    );
}

export default App;
