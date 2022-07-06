import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PostList from "components/PostList";
import AppLayout from "components/AppLayout";
import StoryList from 'components/StoryList';
import SuggestionList from 'components/SuggestionList';


function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/posts/new");
    };
    const sidebar = (
        <>
            <Button type="primary" block style={{ marginBottom: '3rem' }} onClick={handleClick}>
                New Post
            </Button>
            <StoryList style={{ marginBottom: '3rem' }} />
            <SuggestionList style={{ marginBottom: '3rem' }} />
        </>
    );
    return (
        <AppLayout sidebar={sidebar}>
            <PostList />
        </AppLayout>
    );
}

export default Home;