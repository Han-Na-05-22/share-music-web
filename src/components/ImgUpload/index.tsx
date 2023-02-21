import { ImgUploadContainer } from "./style";
import { ImgUploadProps } from "./interface";
import SVG from "react-inlinesvg";

const ImgUpload = ({
  width = "100px",
  height = "100px",
  className,
  value,
  name,
  file,
  onChange,
  onClick,
  isError = false,
}: ImgUploadProps) => {
  return (
    <ImgUploadContainer
      width={width}
      height={height}
      className={className}
      isError={isError}
    >
      {file && !isError ? (
        <label htmlFor="file-change" className="file-change">
          <SVG src="/svg/icon-pic.svg" />
        </label>
      ) : (
        <label htmlFor="file-upload" className="file-upload">
          <SVG src="/svg/profile.svg" />
        </label>
      )}
      <input
        type="file"
        value={value}
        id={file ? "file-change" : "file-upload"}
        name={name}
        onClick={onClick}
        onChange={onChange}
      />
      {file && <img src={file} alt="preview-img" />}
    </ImgUploadContainer>
  );
};

export default ImgUpload;
