import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const showToast = useShowToast();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);

        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
        // console.log(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username, showToast]);

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
      <UserPost />
      <UserPost />
      <UserPost />
    </>
  );
};

export default UserPage;
