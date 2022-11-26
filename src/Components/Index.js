import axios from "axios";
import React, { useEffect, useState } from "react";
import { LoadingPosts } from "./loadingPosts";

const Cards = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(1);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    setUsers((prev) => [...prev, ...response.data]);
    setLoading(false);
  }, [userId]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setUserId((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="container">
        {users.map((curElem) => {
          return (
            <div className="card_item" key={curElem.id}>
              <div className="card_inner">
                <img
                  src={`https://avatars.dicebear.com/api/micah/${curElem.id}.svg`}
                  alt=""
                /> 
                <div className="userName">Id : {curElem.id}</div>
                <div className="userName">Title : {curElem.title}</div>
                <p className="userUrl">User Id : {curElem.userId}</p>
                <p className="userUrl">About : {curElem.body}</p>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <LoadingPosts />}
    </>
  );
};

export default Cards;
