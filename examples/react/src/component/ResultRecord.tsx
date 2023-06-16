import { MouseEventHandler, useState } from "react";

interface ResultRecordProps {
    title: string;
    onAction: () => Promise<string> | string;
}
export const ResultRecord = (props: ResultRecordProps): JSX.Element => {
    const { title, onAction } = props;
    const [result, setResult] = useState<string | null>(null);

    return (
        <div>
            <h2>{title}</h2>
            <button
                onClick={async () => {
                    setResult(await onAction());
                }}>
                do
            </button>
            <span>{result}</span>
        </div>
    );
};
