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
  displayName: any;
  mpName?: string;
  explanation: string;
  formData?: any;
  genre: string;
  date: any;
  uniqueKey: any;
}

export interface MusicCountListProps {
  email?: string;
  updateTiem?: any;
}

export interface MusicFormProps {
  date?: any;
  displayName: string;
  downloadClickList: MusicCountListProps[];
  downloadCount: number;
  email: string;
  explanation: string;
  genre: string;
  id: number;
  img: string;
  likeCount: number;
  likedClickList: MusicCountListProps[];
  mp3: string;
  singer: string;
  title: string;
  url: string;
}
