import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import VotesShow from "../votes/votes_show_container";

class CommentsItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { comment, destroyComment, currentUser } = this.props;

        return (
            <li className="comments-item-li">
                <div className="comments-author">
                    {comment.username}
                </div>
                <div className="comments-body">
                    {comment.comment_body}
                </div>
                <VotesShow
                    comment={comment}
                />
                <div className="comment-del-button-cont">
                    { (currentUser && comment.author_id === currentUser.id)
                        ? (
                            <div
                                className="comments-del-button"
                                onClick={() => {
                                    destroyComment(comment.id);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} />
                                <span
                                    className="comments-del-button-text"
                                >
                                    Delete Comment
                                </span>
                            </div>
                        )
                        : null }
                </div>
            </li>
        )
    }
};

export default CommentsItem;
