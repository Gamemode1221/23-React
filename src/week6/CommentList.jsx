import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "최용호",
        comment: "안녕하세요, 최용호입니다."
    },
    {
        name: "최용호2",
        comment: "안녕하세요, 최용호2입니다."
    },
    {
        name: "최용호3",
        comment: "안녕하세요, 최용호3입니다."
    }
];

function CommentList(props) {
    return (
        <div>
            {comments.map(foo => {
                    return (
                        <Comment name={foo.name} comment={foo.comment} />
                    );
                })}
        </div>
    );
}

export default CommentList;