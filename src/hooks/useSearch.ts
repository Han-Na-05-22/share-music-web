import { MusicFormProps } from "components/AddMusic/interface";
import { musicListState } from "components/AddMusic/state";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function useSearch() {
  const [musicList, setMusicList] =
    useRecoilState<MusicFormProps[]>(musicListState);
  const [search, setSearch] = useState<{
    page: number;
    value: string;
    filter?: string | undefined;
    limit: number;
    isHome?: boolean;
  }>({
    page: 1,
    value: "",
    filter: "All",
    limit: 15,
    isHome: true,
  });

  const offset = (search?.page - 1) * search?.limit;

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event) {
      return;
    }

    setSearch({
      ...search,
      value: event?.target?.value,
    });
  };

  const handleChangePage = (data: MusicFormProps[]) => {
    if (data?.length < 10) {
      return setSearch({
        ...search,
        page: 1,
      });
    } else {
      return;
    }
  };

  return {
    search,
    setSearch,
    offset,
    handleChangePage,
    handleChangeValue,
  };
}
