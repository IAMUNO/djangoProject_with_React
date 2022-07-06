import React from "react";
import CommentList from "./CommentList";
import { useAppContext } from "store";
import { Avatar, Card, Comment, Tooltip } from "antd";
import { HeartTwoTone, HeartOutlined, UserOutlined } from "@ant-design/icons";


function Post({ post, handleLike }) {
    const { author, caption, location, photo, tag_set, is_like } = post;
    const { username, name, avatar_url } = author;

    return (
        <div className="post">
            <Card
                hoverable
                cover={<img src={photo} alt={caption} />}
                actions={[
                    is_like ? (
                        <HeartTwoTone
                            twoToneColor="Blue"
                            onClick={() => handleLike({ post, isLike:false })}
                        />
                    ) : (
                        <HeartOutlined onClick={() => handleLike({ post, isLike:true })} />
                    )
                ]}
            >
                <Card.Meta
                    avatar={<Avatar
                                size="large"
                                icon={<img src={avatar_url} alt={username} />}
                            />}
                    title={ caption }
                    description={ location }
                    style={{ marginBottom: "0.5em" }}
                />
                <CommentList post={post} />
            </Card>
        </div>
    );
}

export default Post;