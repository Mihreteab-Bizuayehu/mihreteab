import { Metadata } from "next";

export const metadata:Metadata={
    title:"Post Page"}
export default function Post({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div>
            <h1>Post Page {id}</h1>
        </div>
    );
}