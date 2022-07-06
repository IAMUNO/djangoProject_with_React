import React, { useEffect, useState } from "react";
import { Alert } from "antd";
import { axiosInstance, useAxios } from "api";
import Post from "./Post";
import { useAppContext } from "store";


function PostList() {
    const { store: { Token } } = useAppContext();
    const [postList, setPostList] = useState([]);
    const headers = { Authorization: `Bearer ${Token}` };
    const [{data: originPostList, loading, error }, refetch] = useAxios({
        url: "/api/posts/",
        headers,
    });

    useEffect( () => {
        setPostList(originPostList);
    }, [originPostList]);

    const handleLike = async ({ post, isLike }) => {
        const apiUrl = `/api/posts/${post.id}/like/`;
        const method = isLike? "POST" : "DELETE" ;
    try {
        const response = await axiosInstance({
            url: apiUrl,
            method,
            headers
        });
        console.log("response : ", response);

        setPostList(prevList => {
            return prevList.map( currentPost =>
                currentPost === post ? {...currentPost, is_like: isLike} : currentPost
            );
        });
    }
    catch(error) {
        console.log("success: ", error);
    }
};


    return (
        <div>
            {postList && postList.length === 0 &&
                <Alert type="warning" message="There is no posting :-( !!!" />
            }
            {postList && postList.map(post => (
                <Post post={post} key={post.id} handleLike={handleLike}/>
            ))}
        </div>
    );
}

export default PostList;