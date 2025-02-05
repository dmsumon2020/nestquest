import { useMutation } from "@tanstack/react-query";

const useImgBBUpload = () => {
  return useMutation({
    mutationFn: async (photoFile) => {
      const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
      const imgbbFormData = new FormData();
      imgbbFormData.append("image", photoFile);
      imgbbFormData.append("key", imgbbApiKey);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: imgbbFormData,
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error("Failed to upload image to ImgBB");
      }

      return data.data.url; // Return the image URL
    },
  });
};

export default useImgBBUpload;
