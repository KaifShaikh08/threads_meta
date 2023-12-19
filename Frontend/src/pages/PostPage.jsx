import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Action from "../components/Action";
import Comment from "../components/Comment";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src={"/zuck-avatar.png"} size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              kaiferew
            </Text>
            <Image src="/verified.png" w="4" h={4} ml={4} />
          </Flex>
        </Flex>
      </Flex>

      <Text my={3}>fdfdfdhfjhdskjfhsdjf</Text>

      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src={"/post2.png"} w={"full"} />
      </Box>

      <Flex gap={3} my={3}>
        <Action liked={liked} setliked={setLiked} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}></Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"2xl"}>👋</Text>
        <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
      </Flex>
      <Button>Get</Button>

      <Divider my={4} />
      <Comment />
    </>
  );
};

export default PostPage;
