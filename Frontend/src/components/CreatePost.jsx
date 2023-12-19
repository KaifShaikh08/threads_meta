import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImg from "../Hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../Hooks/useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const CreatePost = () => {
  const user = useRecoilValue(userAtom);
  const MAX_CHAR = 500;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const [remainingText, setRemainingText] = useState("");
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
  const fileRef = useRef(null);
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      console.log(truncatedText);
      setPostText(truncatedText);
      setRemainingText(0);
    } else {
      setPostText(inputText);
      setRemainingText(MAX_CHAR - inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl,
        }),
      });

      const data = await res.json();
      setLoading(false);
      console.log(data);
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", data.message, "success");
      onClose();
      setLoading(false);
      setPostText("");
      setImgUrl("");
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="What's on you mind?"
                value={postText}
                onChange={handleTextChange}
              />
              <Text
                fontSize={"xs"}
                m={1}
                textAlign={"right"}
                fontWeight={"bold"}
              >
                {remainingText}/{MAX_CHAR}
              </Text>
              <Input
                type="file"
                ref={fileRef}
                hidden
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => fileRef.current.click()}
              />
            </FormControl>
            {imgUrl && (
              <Flex mt={"5"} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt="Selected Image" />
                <CloseButton
                  onClick={() => setImgUrl("")}
                  bg={"gray.800"}
                  position={"absolute"}
                  right={2}
                  top={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
