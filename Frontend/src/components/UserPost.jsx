import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Action from "./Action";

const UserPost = () => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/kaif/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex direction={"column"} alignItems={"center"}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Zuckerberg" />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={"2"}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="zuckerberg"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="zuckerberg"
              src="https://bit.ly/ryan-florence"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="zuckerberg"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                zuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>This is my first post</Text>
          <Box
            border={"2x solid"}
            borderRadius={"6px"}
            overflow={"hidden"}
            borderColor={"gray.light"}
          >
            <Image src="/post1.png" />
          </Box>
          <Flex>
            <Action liked={liked} setliked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              999 replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize="sm">
              430 likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
