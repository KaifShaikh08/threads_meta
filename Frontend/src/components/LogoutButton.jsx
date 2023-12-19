import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../Hooks/useShowToast";
import { HiOutlineLogout } from "react-icons/hi";

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();

  const handleLogut = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json;
      if (data.error) {
        showToast("Error", data.error, "error");
      }
      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogut}
    >
      <HiOutlineLogout size={20} />
    </Button>
  );
};

export default LogoutButton;
