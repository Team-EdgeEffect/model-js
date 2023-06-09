import { getTestMessage } from "@edge-effect/model-js";
import React from "react";

function App() {
    return (
        <div className="App">
            <h1>model-js-example-react</h1>
            <section>{getTestMessage()}</section>
        </div>
    );
}

export default App;
