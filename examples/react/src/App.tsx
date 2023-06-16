import React, { useRef, useState } from "react";
import SampleModel from "./model/SampleModel";
import { isResponseError, isResponseSuccess } from "@edge-effect/model-js";
import { ResultRecord } from "./component/ResultRecord";
import Post from "./entity/Post";

function App() {
    const sampleModel = useRef<SampleModel>(new SampleModel());

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
                        const response = await sampleModel.current.getPost(1);
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
                        const response = await sampleModel.current.getPosts();
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

// const recordId = "1";

// <div>
//     <h2>request example 2</h2>
//     <button
//         onClick={async () => {
//             const recordId = "2";
//             const response = await sampleModel.current.getPosts();
//             if (isResponseSuccess(response)) {
//                 const content = response.content;
//                 setResulRecords({
//                     ...resultRecords,
//                     [recordId]: `success: { userId: ${content.userId}, id: ${content.id}, title: ${content.title}, body: ${content.body} }`,
//                 });
//             } else if (isResponseError(response)) {
//                 setResulRecords({
//                     ...resultRecords,
//                     [recordId]: `Exception raised: ${response.detail.message}`,
//                 });
//             }
//         }}>
//         do
//     </button>
//     <span>{resultMap["2"]}</span>
// </div>
