import { useRecoilState } from "recoil";

import { localStorageAtom } from "../../../recoil/seen-modal";

import { postError } from "../../../pages/services/postError";

export function useLocalStorage(): [string[], (value: string[]) => void] {
  const [storedValue, setStoredValue] = useRecoilState(localStorageAtom);

  const setValue = (value: string[]) => {
    try {
      setStoredValue(value);
    } catch (error) {
      postError(error);
    }
  };

  return [storedValue, setValue];
}
