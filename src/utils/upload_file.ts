import fs from "fs";
import path from "path";
import { promisify } from "util";
import dayjs from "dayjs";

const writeFileAsync = promisify(fs.writeFile);

// path, image
const uploadImageBase64 = async (baseImage: string, pathImg: string) => {
  try {
    const projectPath = path.resolve("./");
    const uploadPath = `${projectPath}/public/images/${pathImg}/`;
    const ext = baseImage.substring(
      baseImage.indexOf("/") + 1,
      baseImage.indexOf(";base64")
    );
    const day = dayjs().format("YYYYMMDDHHmmss");

    let filename = "";
    if (ext === "svg+xml") {
      filename = `${day}.svg`;
    } else {
      filename = `${day}.${ext}`;
    }

    let image = decodeBase64Image(baseImage);

    await writeFileAsync(uploadPath + filename, image.data, "base64");

    return filename;
  } catch (error) {
    throw error;
  }
};

const decodeBase64Image = (base64Str: string) => {
  try {
    interface Image {
      type: string;
      data: string;
    }

    let matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let image: Image = {
      type: "",
      data: "",
    };

    if (!matches || matches.length !== 3) {
      throw new Error("Invalid base64 string");
    }

    image.type = matches[1];
    image.data = matches[2];

    return image;
  } catch (error) {
    throw error;
  }
};

export default uploadImageBase64;
