import { UploadProps } from "./interface";
import { UploadContainer } from "./style";

// todo : 수정 필요!!!

const Upload = ({
  className,
  children,
  width = "800px",
  height = "95px",
  name,
  file,
  onChange,
  onClick,
}: UploadProps) => {
  return (
    <UploadContainer className={className} width={width} height={height}>
      <p>{file}</p>
      <label htmlFor="file-upload" className="file-upload">
        업로드
      </label>

      <input
        type="file"
        id={"file-upload"}
        name={name}
        onClick={onClick}
        onChange={onChange}
      ></input>
    </UploadContainer>
  );
};

export default Upload;
