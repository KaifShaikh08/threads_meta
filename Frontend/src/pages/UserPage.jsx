import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import useShowToast from "../Hooks/useShowToast";
import Post from "../components/Post";
import useGetUserProfile from "../Hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const UserPage = () => {
  const showToast = useShowToast();
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/user/${username}`);

        const data = await res.json();
        if (data.error) {
          return showToast("Error", data.error, "error");
        }

        // console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", error, "error");
        setPosts([]);
      } finally {
        setFetching(false);
      }
    };
    getPost();
  }, [username, showToast, setPosts]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !loading) {
    return (
      <Flex justifyContent={"center"}>
        <h1>User not found</h1>
      </Flex>
    );
  }

  if (!user) return null;
  return (
    <>
      <UserHeader user={user} />

      {!fetching && posts.length === 0 && <h1>User has not posts.</h1>}
      {fetching && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
