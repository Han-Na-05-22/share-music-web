import { ProfileImgContainer } from "./style";
import { ProfileImgProps } from "./interface";
import SVG from "react-inlinesvg";

const ProfileImg = ({
  width = "100px",
  height = "100px",
  className,
  errMsg,
  value,
  name,
  file,
  onChange,
  onClickDelete,
  onClick,
  isError = false,
}: ProfileImgProps) => {
  return (
    <ProfileImgContainer
      width={width}
      height={height}
      className={className}
      isError={isError}
    >
      {file && (
        <SVG
          onClick={onClickDelete}
          className="delete-icon"
          src="/svg/delete-red.svg"
        />
      )}
      {file && !isError ? (
        <label htmlFor="file-change" className="file-change"></label>
      ) : (
        <label htmlFor="file-upload" className="file-upload">
          <SVG src="/svg/profile.svg" />
        </label>
      )}
      <input
        accept="image/jpg, image/png, image/jpeg"
        type="file"
        value={value}
        id={file ? "file-change" : "file-upload"}
        name={name}
        onClick={onClick}
        onChange={onChange}
      />
      {file && <img src={file} alt="preview-img" />}
      {isError && <p>{errMsg}</p>}
    </ProfileImgContainer>
  );
};

export default ProfileImg;
