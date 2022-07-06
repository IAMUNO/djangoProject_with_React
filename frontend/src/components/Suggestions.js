import React from "react";
import { Avatar, Button } from "antd";
import "./Suggestions.scss"

export default function Suggestion ( {suggestionUser, onFollowUser } ) {
    const { username, name, avatar_url, is_follow } = suggestionUser;
    return (
        <div className="suggestion">
            <div className="avatar">
                <Avatar
                    size="small"
                    icon={
                        <img
                            src={"http://127.0.0.1:8000" + avatar_url}
                            alt={`${username} avatar`}
                        />
                    }
                />
            </div>
            <div className="username">{name.length === 0 ? username : name}</div>
            <div className="action">
                { is_follow && "following"}
                { !is_follow && (
                    <Button size="small"
                    onClick={ () => onFollowUser(username)}>
                        Follow
                    </Button>
                )}
            </div>
        </div>
    );
}