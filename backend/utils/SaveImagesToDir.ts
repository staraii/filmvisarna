import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";



type ImagesData = {
  decoded: Buffer[]
  filenames: string[];
}


export default class SaveImagesToDir{
  #THIS_DIR = path.dirname(fileURLToPath(import.meta.url));
  #IMAGES_DIR = path.join(this.#THIS_DIR, "../assets/images");
  #FILE_EXT_REGEX = /^data:image\/(png|jpg|jpeg|webp);base64,(.+)$/;
  #imagesData: ImagesData;
  
  

  constructor(encodedPoster: string, encodedSlide: string, encodedPostersList: string[]){
    this.#makeImagesDirIfNotAlreadyExists(this.#IMAGES_DIR);
    this.#imagesData = this.#getImageData([encodedSlide, encodedPoster, ...encodedPostersList]);
  }

  
  #makeImagesDirIfNotAlreadyExists(IMAGE_DIR: string) {
    if (!fs.existsSync(IMAGE_DIR)) {
      fs.mkdirSync(IMAGE_DIR, { recursive: true });
    }
  }



  #getImageData(encodedList: string[]) {
    const decodedList: Buffer[] = [];
    const filenameList: string[] = [];
    encodedList.forEach((encoded, index) => {
      const imageData = encoded.match(this.#FILE_EXT_REGEX);
      if (imageData) {
        const binaryBuffer = Buffer.from(imageData[2], "base64");
        const filename = `${index === 0 ? "slide" : `poster-${index}`}.${
          imageData[1]
        }`;
        decodedList.push(binaryBuffer);
        filenameList.push(filename);
      }
    })
    return {decoded: decodedList, filenames: filenameList}
  }


  async #writeImageBuffersToDisc(imageBuffers: Buffer[], filenames: string[]) {
    try {
      const fileWritePromises = imageBuffers.map((buffer, index) => {
        const filePath = path.join(this.#IMAGES_DIR, filenames[index]);
        return fs.writeFile(filePath, buffer, err => {
          if (err) {
            console.error("Error writing file: ", err);
            return;
          }
          console.log("File written successfully: " + filenames[index])
        });
      });
      await Promise.all(fileWritePromises);
      return filenames;
    } catch (error) {
      await Promise.all(imageBuffers.map((_buffer, index) => {
        const filePath = path.join(this.#IMAGES_DIR, filenames[index]);
        return fs.unlink(filePath, err => {
          if (err) {
            console.log("error deleting file ", err);
          }
          console.log("File deleted: " + filenames[index])
        });
      }));
      throw new Error("Error writing files to disc: ", (error as Error))
    }
  }


  async saveImageFiles(movieId: string) {
    const filePaths: string[] = [];
    const filenames: string[] = [];
    this.#imagesData.filenames.forEach((file) => {
      filePaths.push(`/movie-${movieId}-${file}`);
      filenames.push(`movie-${movieId}-${file}`);
    })
    try {
      await this.#writeImageBuffersToDisc(this.#imagesData.decoded, filePaths);
    } catch (error) {
      console.error(error)
      throw new Error("Error writing files to disc");
    }
    return filenames;
  }
}
