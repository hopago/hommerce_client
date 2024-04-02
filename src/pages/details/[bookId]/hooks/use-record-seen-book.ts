import { useEffect } from "react";

import { patchSeenBookCategory } from "../services/patchSeenBookCategory";

import { useLocalStorage } from "../../../../@modal/seen-book/hooks/use-local-books";

type UseRecordSeenBookProps = {
  bookId: string | undefined;
  userId: string | undefined;
  category: BookSubCategory | undefined;
};

export const useRecordSeenBook = ({
  bookId,
  userId,
  category,
}: UseRecordSeenBookProps) => {
  const [seenBookIds, setSeenBookIds] = useLocalStorage();

  useEffect(() => {
    if (bookId) {
      if (!seenBookIds.includes(bookId)) {
        if (seenBookIds.length === 10) {
          seenBookIds.shift();
        }
        setSeenBookIds([...seenBookIds, bookId]);
      }
    }
  }, [bookId]);

  useEffect(() => {
    if (bookId && category && userId) {
      patchSeenBookCategory(category, userId);
    }
  }, [bookId]);
};
