# model-js

-   request / response model library based [axios@1.1.0](https://www.npmjs.com/package/axios)

-   typescript, javascript support

# How to install

```bash
npm install @edge-effect/model-js
```

# How to use

## Create a class for a set of requests

-   The getDomain function must be implemented as an abstract function.
-   If you do not specify generics for the get/post/put/delete/request functions of the Model class, it is basically Record<string, any>.

```typescript
import { Model } from "@edge-effect/model-js";
import Post from "../entity/Post";

export default class SampleModel extends Model {
    protected getDomain(): string {
        return "https://jsonplaceholder.typicode.com";
    }

    public async getPost(id: number) {
        return this.get<Post>({
            path: `posts/${id}`,
        });
    }

    public async getPosts() {
        return this.get<ReadonlyArray<Post>>({
            path: "posts",
        });
    }
}
```

## Request

-   response returns BaseResponse by default.

```typescript
const sampleModel = new SampleModel();
async function updateUi() {
    const response = await sampleModel.getPost(1);
    console.log(response);
}
```

## BaseResponse handling

### Description of the Response classes

-   The following class is returned when calling the get/post/put/delete/request function of the Model class.

    -   BaseResponse: Class inherited from classes such as SuccessResponse and ErrorResponse.

        ```typescript
        public native?: AxiosResponse;
        public content?: T;
        ```

    -   SuccessResponse: The return value of the status that the request is a successful request, where a successful request means that the http status code is in the 200 range.

        ```typescript
        public native: AxiosResponse;
        public content: T;
        ```

    -   ErrorResponse: Return value of failed request, in case the http status code is not in the 200 range or an error for other reasons.

        ```typescript
        public native?: AxiosResponse;
        public content?: T;
        public detail: Error;
        ```

    -   InterceptResponse: In case of returning InterceptResponse from onPostIntercept function through action parameter of request function, it can generally be regarded as an intercepted response result, and appropriate processing can be done accordingly if desired.

## Example

-   If you check the response with isResponseSuccess, the response is treated as the SuccessResponse class in the corresponding block.
-   If response is checked with isResponseError, response is treated as ErrorResponse class in the corresponding block.
-   In general, it is not necessary to process the else.

```typescript
import { isResponseError, isResponseSuccess } from "@edge-effect/model-js";

// BaseResponse
const response = await sampleModel.getPost(1);
if (isResponseSuccess(response)) {
    // SuccessResponse
    // response.content becomes Post.class
    console.log(response.native, response.content);
} else if (isResponseError(response)) {
    // ErrorResponse
    // response.native and response.content can be null
    console.log(response.native, response.content, response.detail);
} else {
    console.log("Cases that do not require handling");
}
```

# Features to be added

-   Um... Any ideas are welcome!
