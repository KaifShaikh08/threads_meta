import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Action from "./Action";

const Comment = ({ reply, lastReply }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={"/zuck-avatar.png"} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="sm" fontWeight="bold">
              fdsfds
            </Text>
          </Flex>
          <Text>fdsfsdfds</Text>
          <Action liked={liked} setliked={setLiked} />
          <Text fontSize={"sm"} color={"gray.light"}>
            {100 + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
};

export default Comment;
