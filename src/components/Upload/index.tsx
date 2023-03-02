import { UploadProps } from "./interface";
import { UploadContainer } from "./style";

// todo : 수정 필요

const Upload = ({
  className,
  children,
  width = "800px",
  height = "95px",
  value,
  name,
  file,
  onChange,
  onClick,
}: UploadProps) => {
  return (
    <UploadContainer className={className} width={width} height={height}>
      <span>프로필 사진</span>
      <label htmlFor="file-upload" className="file-upload">
        업로드
      </label>

      <input
        type="file"
        value={value}
        id={"file-upload"}
        name={name}
        onClick={onClick}
        onChange={onChange}
      ></input>
      <p>{file}</p>
    </UploadContainer>
  );
};

export default Upload;
