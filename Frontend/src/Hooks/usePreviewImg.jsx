import { useState } from "react";
import useShowToast from "../Hooks/useShowToast";

const usePreviewImg = () => {
  const [imgUrl, setImgUrl] = useState(null);
  const showToast = useShowToast();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Error", "Invalid file type", "error");
      console.log("Error in Image hook");
      setImgUrl(null);
    }
  };
  //   console.log(imgUrl);

  return {
    handleImageChange,
    imgUrl,
    setImgUrl,
  };
};

export default usePreviewImg;
