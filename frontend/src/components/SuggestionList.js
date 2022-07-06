import React, { useState, useEffect } from "react";
import { Card } from "antd";
import Suggestion from "./Suggestions";
import { axiosInstance, useAxios } from "api";
import { useAppContext } from "store";
import "./SuggestionList.scss";


export default function SuggestionList({ style }) {
    const { store: { Token } } = useAppContext();
    const [userList, setUserList] = useState([]);
    const headers = { Authorization: `Bearer ${Token}` };

    const [{data:origUserList, loading, error }, refetch] = useAxios({
        url: "/accounts/suggestions/",
        headers,
    });
    useEffect(() => {
        if ( !origUserList ) setUserList([]);
        else setUserList(origUserList.map(user => ({ ...user, is_follow:false })));
    }, [origUserList]);

    const onFollowUser = (username) => {
        const data = { username };
        const config = { headers };
        axiosInstance.post("/accounts/follow/", data , config )
            .then(response => {
                setUserList(prevUserList =>
                     prevUserList.map(user =>
                        (user.username !== username) ? user : { ...user, is_follow:true }
                     )
                );
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div style={style}>
            { loading && <div>Loading...</div> }
            { error && <div> Error has occurred while Loading!!! </div> }

            <Card title="Suggestions for you" size="small">
                {userList.map(suggestionUser =>
                <Suggestion
                    key={suggestionUser.username}
                    suggestionUser={suggestionUser}
                    onFollowUser={onFollowUser} />
                )}
            </Card>
        </div>
    );
}