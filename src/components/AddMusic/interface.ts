export interface AddMusicProps {
  className?: string;
  width?: string;
  height?: string;
}

export interface AddMusicStyleProps {
  width?: string;
  height?: string;
}
export interface AddMusicFormProps {
  img: string;
  mp3: any;
  title: string;
  singer: string;
  mpName?: string;
  explanation: string;
  formData?: any;
  genre: string;
  date: any;
  uniqueKey: any;
}

export interface addMusicDatabaseProps {
  file: {
    lastModified: any;
    lastModifiedDate: any;
    name: any;
    size: any;
    type: any;
    webkitRelativePath: any;
  };
  src: string;
  data: {
    genre: string;
    title: string;
    singer: string;
    explanation: string;
    uniqueKey: string;
    img: string;
  };

  setIsCompleted?: any;
  form?: any;
  musicList?: any;
  isClicked?: any;
  setMusicList?: any;
}
