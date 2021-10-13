import { ToastMessage } from "../contexts/ToastContext";
import validateFileExtension from "./validateFileExtension";
import validateImageSize from "./validateImageSize";

interface ImageUploaderProps {
  file: File;
  acceptedExtensions: Array<string>;
  formatErrorMessage: string;
  maxWidth: number;
  maxHeight: number;
  imgPreview: string;
  addToast(message: Omit<ToastMessage, "id">): void;
}

const imageUploadValidation = async ({
  file,
  acceptedExtensions,
  formatErrorMessage,
  maxWidth,
  maxHeight,
  imgPreview,
  addToast,
}: ImageUploaderProps) => {
  try {
    if (
      !validateFileExtension(file.name.toLocaleLowerCase(), acceptedExtensions)
    ) {
      addToast({
        type: "error",
        title: "Erro no upload de imagem.",
        description: formatErrorMessage,
      });

      return true;
    }

    await validateImageSize({
      imgUrl: imgPreview,
      maxWidth,
      maxHeight,
    });
  } catch (err: any) {
    addToast({
      type: "error",
      title: "Erro no upload de imagem.",
      description: err,
    });

    return true;
  }

  return false;
};

export default imageUploadValidation;
