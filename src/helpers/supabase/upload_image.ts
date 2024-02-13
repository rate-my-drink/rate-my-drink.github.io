import { supabase } from "../../config/supabase.ts";
import { decode } from "base64-arraybuffer";
import { generate_uuidv4 } from "../general/uuid.ts";

export async function upload_image(
  previewImage: string,
  userId: string,
  folderName: string = "",
): Promise<string> {
  const imgPath = await upload_image_data(previewImage, folderName);
  const imageUrl = await get_image_url(imgPath);
  const imageId = await upload_to_image_table(imageUrl, userId);
  return imageId;
}

async function upload_image_data(
  previewImage: string,
  folderName: string = "",
): Promise<string> {
  if (folderName && !folderName.endsWith("/")) {
    folderName += "/";
  }

  const parts = previewImage.split(",");
  const contentType = parts[0].split(":")[1].split(";")[0];
  const postfix = contentType.split("/")[1];
  const imageBase64 = parts[parts.length - 1];

  const { data, error } = await supabase.storage
    .from("coffee-images")
    .upload(
      `public/${folderName}${generate_uuidv4()}.${postfix}`,
      decode(imageBase64),
      {
        cacheControl: "3600",
        upsert: false,
        contentType,
      },
    );

  if (error) {
    console.error(error);
    return "";
  }
  return data.path;
}

async function get_image_url(imgPath: string): Promise<string> {
  const { data } = supabase.storage.from("coffee-images").getPublicUrl(imgPath);

  if (!data.publicUrl) {
    console.error(data);
    return "";
  }
  return data.publicUrl;
}

async function upload_to_image_table(
  imageUrl: string,
  userId: string,
): Promise<string> {
  const { data, error } = await supabase
    .from("images")
    .insert({
      url: imageUrl,
      storage_vendor: "supabase",
      user: userId,
    })
    .select();

  if (error) {
    console.error(error);
    return "";
  }
  return data[0].id;
}
