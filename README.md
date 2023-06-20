# model-js

-   request / response model library based [axios@1.1.0](https://www.npmjs.com/package/axios)

-   typescript, javascript 지원

-   [view in english](https://github.com/Team-EdgeEffect/model-js/blob/main/README_EN.md)

# 설치방법

```bash
npm install @edge-effect/model-js
```

# 사용법

## 요청 집합에 대한 클래스 생성

-   getDomain 함수는 abstract function으로 반드시 구현해야 합니다.
-   Model 클래스의 get/post/put/delete/request 함수 등에 대해 제너릭을 지정하지 않으면, 기본적으로 Record<string, any> 입니다.

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

## 요청

-   response 는 기본적으로 BaseResponse 를 반환합니다.

```typescript
const sampleModel = new SampleModel();
async function updateUi() {
    const response = await sampleModel.getPost(1);
    console.log(response);
}
```

## BaseResponse 핸들링

### Response 클래스에 대한 설명

-   Model 클래스의 get/post/put/delete/request 함수 등을 호출하면 아래 클래스가 반환됩니다.

    -   BaseResponse: SuccessResponse, ErrorResponse 등의 클래스가 상속 받은 클래스.

        ```typescript
        public native?: AxiosResponse;
        public content?: T;
        ```

    -   SuccessResponse: 요청이 성공적인 요청인 상태의 반환 값, 여기서 성공적인 요청이란 http status code 가 200번대임을 말함.

        ```typescript
        public native: AxiosResponse;
        public content: T;
        ```

    -   ErrorResponse: 요청이 실패한 상태의 반환 값, http status code 가 200번대가 아니거나 기타 사유의 에러인 경우에 해당.

        ```typescript
        public native?: AxiosResponse;
        public content?: T;
        public detail: Error;
        ```

    -   InterceptResponse: request 함수에 action 파라미터를 통해 onPostIntercept 함수에서 InterceptResponse 를 반환하는 경우, 일반적으로 intercepted 된 응답 결과라고 보면 되며, 원하는 경우 그에 따른 적절한 처리를 하면 된다.

## Example

-   isResponseSuccess 로 response 를 체크하면 해당 블록에서 response 가 SuccessResponse 클래스 취급이 된다.
-   isResponseError 로 response 를 체크하면 해당 블록에서 response 가 ErrorResponse 클래스 취급이 된다.
-   일반적으로 else에 대한 처리를 하지 않아도 된다.

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

# 직접 해보세요

-   프로젝트 내 examples 폴더에서 이것저것 테스트가 가능합니다
-   node, react example 제공

# 추가될 기능

-   음... 모든 아이디어는 환영입니다!
