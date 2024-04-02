import { DefaultValue, atom, selector } from "recoil";

export const showSeenModal = atom<boolean>({
  key: "seenModal",
  default: false,
});

export const seenModalState = selector({
  key: "toggleSeenModal",
  get: ({ get }) => get(showSeenModal),
  set: ({ set, get }, newValue) => {
    if (newValue instanceof DefaultValue) {
      const currState = get(showSeenModal);
      set(showSeenModal, !currState);
    } else {
      set(showSeenModal, newValue);
    }
  },
});

export const localStorageAtom = atom<string[]>({
  key: "seenBookIdsLocalStorageState",
  default: (() => {
    const item = window.localStorage.getItem("seenBookIDs");
    return item ? JSON.parse(item) : [];
  })(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        window.localStorage.setItem("seenBookIds", JSON.stringify(newValue));
      });
    },
  ],
});
