
# Hommerce  
### 테스트 아이디  
ID: hopago 
PW: !nKq9Ybktk6BqG5

## 빌드 정보
![App screenshot](https://i.imgur.com/NdtE6VK.png)

## GTmetrix
![App screenshot](https://i.imgur.com/sLUE9HK.png)
## 전체 흐름도

![App Screenshot](https://i.imgur.com/YRsqCdk.png)

## CLIENT
### package.json
``` json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@clerk/clerk-react": "^4.30.5",
    "@nextui-org/skeleton": "^2.0.24",
    "@tanstack/react-query": "^5.28.6",
    "axios": "^1.6.8",
    "clsx": "^2.1.0",
    "date-fns": "^3.3.1",
    "framer-motion": "^11.0.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.0.1",
    "react-router-dom": "^6.21.3",
    "recoil": "^0.7.7",
    "sonner": "^1.4.32",
    "usehooks-ts": "^2.10.0"
  },
  "devDependencies": {
    "@tanstack/react-query-devtools": "^5.28.6",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "sass": "^1.70.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vite-plugin-favicon": "^1.0.8",
    "vite-plugin-favicon2": "^1.1.5"
  }
}
```
### **dev** / .env
```javascript
VITE_API_SERVER_URL="http://localhost:(PORT)"
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### **production** / .env.production

```javascript
VITE_API_SERVER_URL="your_server_url"
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### vite.config.js  
``` javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteFaviconsPlugin } from "vite-plugin-favicon2";

export default defineConfig({
  plugins: [
    react(),
    ViteFaviconsPlugin({
      logo: "public/assets/logo.png",
      favicons: {
        path: "assets/",
      },
    }),
  ],
});
```
# 폴더 구조

**Next.js의 구조를 따른다**

## 전체 폴더 구조
![App Screenshot](https://i.imgur.com/pow3Y7b.png)
### Nested 폴더 구조
![App Screenshot](https://i.imgur.com/zFDh2yn.png)  
## 라우팅 처리
### routes.ts
``` javascript
export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <Index />,
        index: true,
      },
      {
        path: "/lang/:lang",
        element: <LangIndex />,
        index: true,
      },
      {
        path: "/details/:bookId",
        element: <DetailsIndex />,
        index: true,
      },
      {
        path: "/category/:lang/:category",
        element: <BookCategoryIndex />,
        index: true,
      },
      {
        path: "/myroom",
        element: <MyRoomIndex />,
        index: true,
      },
      {
        path: "/myroom/point",
        element: <MyRoomPointLogIndex />,
        index: true,
      },
      {
        path: "/myroom/review",
        element: <MyRoomReview />,
        index: true,
      },
      {
        path: "/myroom/wish",
        element: <MyRoomWishListIndex />,
      },
    ],
  },
  {
    path: "/cart",
    element: <CartIndex />,
    index: true,
  },
  {
    path: "/search",
    element: <SearchIndex />,
    index: true,
  },
  {
    path: "/login",
    element: <LoginIndex />,
    index: true,
  },
  {
    path: "/join",
    element: <SigninIndex />,
    index: true,
  },
  {
    path: "/join/success",
    element: <SigninSuccessIndex />,
    index: true,
  },
  {
    path: "/join/failure",
    element: <SigninFailureIndex />,
    index: true,
  },
  {
    path: "/*",
    element: <NotFound />,
    index: true,
  },
];

export const pages = [
  { route: "/" },
  { route: "/cart" },
  { route: "/search" },
  { route: "/:lang" },
  { route: "/details/:bookId" },
  { route: "/category/:lang/:category" },
  { route: "/login" },
  { route: "/signin" },
  { route: "/join/success" },
  { route: "/join/failure" },
];
```  
### Main.tsx
``` javascript
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing AUTH-KEY...");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RecoilRoot>
        <Router>
          <App />
          <Toaster richColors expand={true} />
        </Router>
      </RecoilRoot>
    </ClerkProvider>
  </React.StrictMode>
);
```  
### App.tsx  
``` javascript
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing AUTH-KEY...");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RecoilRoot>
        <Router>
          <App />
          <Toaster richColors expand={true} />
        </Router>
      </RecoilRoot>
    </ClerkProvider>
  </React.StrictMode>
);
```  
### GlobalLayout.tsx  
``` javascript
export default function GlobalLayout() {
  const show = useRecoilValue(seenModalState);

  // 전역 모달 show state 감지 후 scroll-behavior를 차단한다
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  return (
    <>
      <Suspense fallback={<GlobalLoadingLayout />}>
        <NewsLetter />
        <Navbar />
        <Outlet />
        <Footer />
      </Suspense>
      <FixedSeenBooks />
    </>
  );
}
```

# 컴포넌트 구조
**위에서 아래로, 순차적으로 기술한다**
## import
![App Screenshot](https://i.imgur.com/R2AuvWv.png)
## const
![App Screenshot](https://i.imgur.com/QOnqHYJ.png)
## Query
![App Screenshot](https://i.imgur.com/8eHlEDm.png)
## useEffect
![App Screenshot](https://i.imgur.com/SKsH9em.png)
## JSX
![App Screenshot](https://i.imgur.com/1EqaH6p.png)
## Features
### /
    1. 커스텀 인피니티 슬라이더

## Usage
# 커스텀 인피니티 슬라이더

## 시나리오

![App screenshot](https://i.imgur.com/tjwjagN.png)  
![App screenshot](https://i.imgur.com/gmJqnSK.png)  
![App screenshot](https://i.imgur.com/e1Hp7uC.png)

## 구현 로직  
``` javascript
// 첫 페이지에만 예외처리를 하기 위한 number값
const FIRST_PREFETCH_LENGTH = 6;

export default function TodayPick() {
  const [pageNum, setPageNum] = useState(1);
  const [currIndex, setCurrIndex] = useState(0);

  /*
    초기 데이터 용 쿼리이다
    별도의 쿼리를 둔 이유는 상위 컴포넌트에서 data를 받아오게 되면,
    하위 컴포넌트 전체가 리랜더링되고 loading 중에 전체 loading skeleton을 보여주게 된다
  */
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: [QueryKeys.MONTHLY_PICKS],
    queryFn: () =>
      QueryFns.FETCH_MONTHLY_PICKS({
        pageNum,
        limit: FIRST_PREFETCH_LENGTH,
      }),
    staleTime: daysToMs(31),
    gcTime: daysToMs(33),
    enabled: pageNum === 1,
  });

  useHandleError({ isError, error });

  // 초기 데이터를 기반으로 클라이언트 books 상태를 설정해주는 custom-hook이다
  const {
    books,
    handleNext,
    handlePrev,
    nextDisabled,
    prevDisabled,
    setNextDisabled,
  } = useInfinityFetching({
    data,
    isSuccess,
    setPageNum,
    currIndex,
    setCurrIndex,
  });

  // JSX
  if (isLoading) return <BookInformationSkeleton />;

  if (isSuccess && books) {
    return (
      <div id="recommend-books" className="recommend-books">
        <div className="recommend-books__today-pick">
          <InfoTitle title="이달의 책" category={bookParentCategory} />
          <PrevIcon prevDisabled={prevDisabled} handlePrev={handlePrev} />
          <div className={"recommend-books__today-pick__contents"}>
            <SingleBook index={currIndex} />
            <NextBooks
              pageNum={pageNum}
              setNextDisabled={setNextDisabled}
              currIndex={currIndex}
            />
          </div>
          <NextIcon nextDisabled={nextDisabled} handleNext={handleNext} />
        </div>
      </div>
    );
  }
}
```  
``` javascript
// use-infinity-fetching.ts
import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useRecoilState } from "recoil";
import { imageSlideBookState } from "../../../recoil/book/books";

type UseInfinityFetchingProps = {
  data: MonthlyPicksResponse | undefined;
  isSuccess: boolean;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  currIndex: number;
  setCurrIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const useInfinityFetching = ({
  data,
  isSuccess,
  setPageNum,
  currIndex,
  setCurrIndex,
}: UseInfinityFetchingProps) => {
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  /* 
    전역 상태로 둔 이유는 초기 데이터를 기반으로 currentBookState와 imageSliderState
    두 가기 상태로 나뉘기 때문이다
    여분의 데이터로 currentBookState를 보여주고 
    API와 연동된 imageSlideState만 업데이트 한다면,
    자연스러운 동작을 보여주게 된다
  */
  const [books, setBooks] = useRecoilState(imageSlideBookState);

  useEffect(() => {
    if (isSuccess && data && "bestBooks" in data) {
      const newBooks = data.bestBooks.map((book) => book.bookDetails);
      if (!books) {
        setBooks(newBooks);
      }
    }
  }, [isSuccess, data]);

  // API로부터 hasNextPage: false가 들어올 경우 다음 슬라이드 버튼은 disabled 상태가 된다
  useEffect(() => {
    if (!data) return;

    if (data && !data.hasNextPage) {
      toast.message("더 이상 표시할 새로운 콘텐츠가 없습니다.");
      setNextDisabled(true);
    }
  }, [currIndex, books]);

  /* 
    슬라이드를 3개씩 보여주고 있기 때문에 0부터 Total Number - 3까지의
    슬라이드 이동을 감지하여
    상태를 초기화 시켜준다 
  */
  useEffect(() => {
    if (isSuccess) {
      if (
        data &&
        data.totalCount &&
        currIndex >= 0 &&
        currIndex <= data.totalCount - 3
      ) {
        setPrevDisabled(false);
        setNextDisabled(false);
      } else {
        setPrevDisabled(currIndex <= 0);
        setNextDisabled(currIndex >= data!.totalCount - 3);
      }
    }
  }, [isSuccess, currIndex, data]);

  const handlePrev = () => {
    if (currIndex !== 0) {
      setCurrIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!data || !data?.totalCount) {
      toast.error("데이터를 불러오던 중 무언가 문제가 생겼어요.");
      return;
    }

    if (currIndex + 3 < data.totalCount) {
      setCurrIndex((prev) => prev + 1);
      const newPageNum = Math.floor(currIndex / 2) + 1;
      setPageNum(newPageNum);
    }
  };

  return {
    handleNext,
    handlePrev,
    books,
    currIndex,
    nextDisabled,
    prevDisabled,
    setNextDisabled,
  };
};
```  
``` javascript
// recoil/book/books.ts
import { atom, selectorFamily } from "recoil";

export const imageSlideBookState = atom<IBook[] | null>({
  key: "booksState",
  default: null,
});

export const currentBookState = atom<IBook | null>({
  key: "currentBookState",
  default: null,
});

export const selectedCurrentBook = selectorFamily({
  key: "selectedCurrentBook",
  get:
    (index: number) =>
    ({ get }) => {
      const books = get(imageSlideBookState);
      if (books) {
        return books[index];
      }
    },
  set:
    (index: number) =>
    ({ set, get }) => {
      const books = get(imageSlideBookState);
      if (books) {
        const currentBook = books[index];
        set(currentBookState, currentBook);
      }
    },
});
```
# /lang/[lang] & /category/[lang]/[category]
## Flow

![App screenshot](https://i.imgur.com/1oEYLmQ.png)  
![App screenshot](https://i.imgur.com/zD4FCdt.png)  
## 구현 로직  
### TodayPick & Best
Picks.tsx
``` javascript
import TodayBest from "./TodayBest";
import TodayPick from "./TodayPick";

export default function Picks() {
  return (
    <div className="lang-page-picks">
      <div className="lang-page-picks__today">
        <TodayPick />
      </div>
      <div className="lang-page-picks__best">
        <TodayBest />
      </div>
    </div>
  );
}
```  
TodayPick.tsx
```javascript
export default function TodayPick() {
  const { lang, category } = useParams<{
    lang: BookParentCategory;
    category: BookSubCategory | undefined;
  }>();

  // lang, category를 쿼리로 넣어준다, category는 optional
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [QueryKeys.TODAY_PICK],
    queryFn: () =>
      QueryFns.FIND_TODAY_PICK<TodayBestResponse | undefined>(
        "todaypicks",
        lang!,
        category
      ),
    staleTime: daysToMs(1),
    gcTime: daysToMs(3),
    enabled: !!lang,
  });

  /* 
    재사용 가능 이미지 슬라이드 훅
    preventNextNumber 프로퍼티는 화면에 보이는 아이템의 개수이다
    예시로 총 10개의 이미지와 4개의 이미지를 미리 보여준다면 index가 6일 때
    disabled 상태여야 빈 슬라이드 노출을 방지할 수 있다
  */
  const {
    setIndex,
    index,
    prevDisabled,
    handlePrev,
    nextDisabled,
    handleNext,
  } = useImageSlide({ total: data?.length!, preventNextNumber: 4 });

  // framer-motion 적용하여 값이 바뀌면 애니메이션 효과를 준다
  const currentBook = data && data[index];

  useHandleError({ error, isError });

  if (isLoading) return <TodayPickLoading />;

  if (isSuccess && data && !data.length) return <TodayPickNoContent />;

  if (isSuccess && data && data.length > 0) {
    return (
      <div className="lang-page-picks__today__vertical">
        <Heading title="오늘의 선택" />
        {currentBook && <CurrentBook book={currentBook!} />}
        <Preview setCurrIndex={setIndex} currIndex={index} books={data} />
        <div className="lang-page-picks__today__vertical__slide-btn">
          <div className="process">
            <div className="fill" style={{ width: `${(index + 1) * 10}%` }} />
            <div className="bg" />
          </div>
          <PrevIcon prevDisabled={prevDisabled} handlePrev={handlePrev} />
          <NextIcon nextDisabled={nextDisabled} handleNext={handleNext} />
        </div>
      </div>
    );
  }
}
```  
## /details/[bookId]
    1. Scroll-Observer 서버 상태 동기화
    2. 우측 하단 최근 본 책 모달 토글 버튼 상태 동기화
    3. 이미지 확대 뷰어 + 슬라이더 연동 모달
    4. 리뷰 작성 및 수정 모달  

### Scroll-Observer 서버 상태 동기화  
##### **UI**  
![App screenshot](https://i.imgur.com/H3eFeDk.png)  
상단 바의 scrollEvent를 감지하고 상품 정보 섹션이 유저에게 노출될 때 SearchBar -> TabList로 전환한다.  
이 과정에서 useRef을 사용한 DOM 조작이 필요했는데, 동적 import를 사용 중 이어서 DOM에 대한 참조가 끊기는 현상이 발생하였고 서버 동기화 상태에 따라 다시 컴포넌트를 구독시킬 필요가 있었다.  
### 구현 로직  
``` javascript
  // 상품 정보, 리뷰에 쓰일 ref
  const prodInfoRef = useRef(null);
  const reviewRef = useRef(null);

  const { setReObserve, isInView } = useObserver({
    ref1: prodInfoRef,
    ref2: reviewRef,
  });
```  
``` javascript
// use-observer.ts

export const useObserver = ({ ref1, ref2 }: UseObserverProps) => {
  const [reObserve, setReObserve] = useState(false);
  const [isInView, setIsInView] = useState<DetailsIndexIds>("prod-info");

  // reObserve를 의존성 배열에 넣어 옵저버를 다시 실행시킨다
  useEffect(() => {
    setReObserve(false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            setIsInView(entry.target.id as DetailsIndexIds);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    if (ref1.current) {
      observer.observe(ref1.current);
    }

    if (ref2.current) {
      observer.observe(ref2.current);
    }

    return () => {
      if (ref1.current) {
        observer.unobserve(ref1.current);
      }

      if (ref2.current) {
        observer.unobserve(ref2.current);
      }
    };
  }, [reObserve]);

  return {
    isInView,
    setReObserve,
  };
};
```  
``` javascript
// DetailsContenst.tsx
const DetailsContents = forwardRef<HTMLDivElement, DetailsContentsProps>(
  ({ bookId, category, lang, setReObserve }, ref) => {
    const { data, isError, isSuccess, error } = useQuery({
      queryKey: [QueryKeys.BOOK_DETAILS, bookId],
      queryFn: () => QueryFns.GET_BOOK_DETAILS(bookId!),
      staleTime: daysToMs(14),
      gcTime: daysToMs(17),
      enabled: !!bookId,
    });

    useHandleError({
      isError,
      error,
      errorDetails: ERROR_DETAILS.GET_BOOK_DETAILS,
    });

    // 데이터 패칭 성공 시 reObserve를 true로 만들어준다
    useEffect(() => {
      setReObserve(true);
    }, [isSuccess]);
...
```  

### 우측 하단 최근 본 책 모달 토글 버튼 상태 동기화
##### **UI**  
![App screenshot](https://i.imgur.com/UE7MRUV.png)  
디테일 페이지 진입 시 우측 하단에 최근 본 책 프리뷰 버튼이 생긴다  
### 구현 로직  
``` javascript
// index.tsx
...
  useRecordSeenBook({ bookId, userId: user?.id, category: data?.category });
...
```  
디테일 페이지에 의존성 배열 없이 useEffect를 사용하여 처리하였다.  
데이터는 로그인 하지 않은 유저도 이용할 수 있도록 로컬에 저장하였다.  
``` javascript
// recoil/seen-modal.ts
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
```  
``` javascript
// use-local-book.ts
export function useLocalStorage(): [string[], (value: string[]) => void] {
  const [storedValue, setStoredValue] = useRecoilState(localStorageAtom);

  const setValue = (value: string[]) => {
    try {
      setStoredValue(value);
    } catch (error) {
      // 예기치 못한 에러는 서버로 전송한다
      postError(error);
    }
  };

  return [storedValue, setValue];
}
```
``` javascript
// use-record-seen-book.ts
export const useRecordSeenBook = ({
  bookId,
  userId,
  category,
}: UseRecordSeenBookProps) => {
  const [seenBookIds, setSeenBookIds] = useLocalStorage();

  useEffect(() => {
    if (bookId) {
      // 중복된 아이템을 추가하지 않도록 한다
      if (!seenBookIds.includes(bookId)) {
        // 10개 이상 저장했을 경우 last-item 제거 후 새로운 아이템을 추가한다
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
```  
![App screenshot](https://i.imgur.com/HK7xUCy.png)  
### 이미지 확대 뷰어 + 슬라이더 연동 모달
##### **UI**  
![App screenshot](https://i.imgur.com/EGLK5iC.png)  
![App screenshot](https://i.imgur.com/3WOKacD.png)  

### 리뷰 작성 및 수정 모달  
##### **UI**  
![App screenshot](https://i.imgur.com/JOsFtDn.png)  
### 구현 로직  
``` javascript
// @modal/post-review/index.tsx
export default function PostReview({ setShow, hasNoReview }: PostReviewProps) {
  const { bookId } = useParams();
  const { user } = useUser();
  // 작성/수정 여부를 판단하는 기준
  const isUserPosted = useRecoilValue(isAlreadyPostReview);

  const queryClient = getQueryClient();

  const book = queryClient.getQueryData<IBook>([QueryKeys.BOOK, bookId]);

  const {
    handleScoreChange,
    handleChangeKeyword,
    score,
    keyword,
    handleChangeDesc,
    desc,
  } = useFormInputs();

  const { handlePost, isPending: isPostingReview } = usePostReview({
    bookId: bookId!,
    setShow,
    userId: user?.id,
  });
  const { handlePatch, isPending: isUpdatingReview } = useUpdateReview({
    bookId: bookId!,
    setShow,
    userId: user?.id!,
  });

  if (!user || !bookId || !book) return null;

  const disabled =
    isPostingReview ||
    isUpdatingReview ||
    desc.trim() === "" ||
    keyword === null;

  const reviewData: MutationProps = {
    userId: user.id,
    username: user.username!,
    bookTitle: book.title,
    hasNoReview,
    review: {
      rating: String(score) as ReviewRatingType,
      keyword: keyword!,
      desc,
    },
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    isUserPosted
      ? handlePatch({
          rating: reviewData.review.rating,
          keyword: reviewData.review.keyword,
          desc: reviewData.review.desc,
        })
      : handlePost(reviewData);
  };
```  
``` javascript
// use-post-review.ts
export const usePostReview = ({
  bookId,
  setShow,
  userId,
}: UsePostReviewProps) => {
  const queryClient = getQueryClient();
  const { mutate, isPending, isError, error } = useMutation<
    IReview,
    ServerError | Error,
    MutationProps
  >({
    mutationFn: ({
      hasNoReview,
      userId,
      username,
      bookTitle,
      review,
    }: MutationProps) =>
      postReview({
        hasNoReview,
        userId,
        username,
        bookId,
        bookTitle,
        review,
      }),
    onSuccess: (newReview: IReview) => {
      // 연관된 쿼리키의 데이터들을 조정해준다

      // 리뷰 총 갯수
      const prevData = queryClient.getQueryData<{ docsLength: number }>([
        QueryKeys.REVIEW_LENGTH,
        bookId,
      ]);

      // post 이므로 책의 리뷰 개수를 올려줌
      if (prevData) {
        queryClient.setQueryData([QueryKeys.REVIEW_LENGTH, bookId], {
          docsLength: prevData.docsLength + 1,
        });
      }

      // 현재 유저 리뷰, 총 리뷰
      queryClient.setQueryData([QueryKeys.REVIEW, userId], newReview);

      // 응답값으로 생성된 리뷰가 들어온다, 페이지네이션 처리된 리뷰 데이터 타입에 맞게 설정
      queryClient.setQueryData(
        [QueryKeys.REVIEWS, bookId],
        (
          prevData: PaginatedReviewResponse | undefined
        ): PaginatedReviewResponse => {
          const totalReviewsBeforeAdd = prevData
            ? prevData.pagination.totalReviews
            : 0;

          const totalReviewsAfterAdd = totalReviewsBeforeAdd + 1;

          const maxReviewsPerPage = PAGE_SIZE;

          const totalPagesAfterAdd = Math.ceil(
            totalReviewsAfterAdd / maxReviewsPerPage
          );

          const hasNextPage =
            totalPagesAfterAdd >
            (prevData ? prevData.pagination.currentPage : 1);

          if (!prevData) {
            return {
              reviews: [newReview],
              pagination: {
                currentPage: 1,
                totalReviews: 1,
                totalPages: 1,
                hasNextPage: false,
              },
            };
          }

          return {
            reviews: [newReview, ...prevData.reviews],
            pagination: {
              ...prevData.pagination,
              totalReviews: totalReviewsAfterAdd,
              totalPages: totalPagesAfterAdd,
              hasNextPage: hasNextPage,
            },
          };
        }
      );

      // 리뷰 총점 재계산
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.REVIEW_TOTAL, bookId],
      });

      toast.success("리뷰 작성을 완료했어요.");
    },
  });

  // execute
  const handlePost = async (review: MutationProps) => {
    mutate(review);

    setShow(false);
  };

  useHandleError({
    error,
    isError,
    errorDetails: ERROR_DETAILS.POST_REVIEW,
  });

  return {
    handlePost,
    isPending,
  };
};
```  
``` javascript
export default function BookPreview({
  score,
  img,
  title,
  handleScoreChange,
}: BookPreviewProps) {
  // score는 i+1을 기준으로 한다, score 3일 시 index 0,1,2 fill 처리
  const isFill = (i: number): boolean => {
    return i < score;
  };

  return (
    <div className="book-preview">
      <div className="book-preview__wrap">
        <img className="book-img" src={img} alt={title} />
        <div className="select-total">
          <p>{title}</p>
          <div className="select-total__score">
            {[...Array.from({ length: 5 })].map((_, i) => (
              <img
                key={i}
                src={isFill(i) ? fillScore : emptyScore}
                alt="score"
                onClick={() => handleScoreChange((i + 1) as ReviewRatingValue)}
              />
            ))}
            <span className="score">{score}</span>
```  
# Authentication  
### Clerk 연동  
### /login  
##### UI  
**아이디/비밀번호 찾기 미구현**  
**이메일 인증 및 Third-party 지원**  
**개선사항: DB 활용 유저명 중복체크, 이메일 중복 체크**

![App screenshot](https://i.imgur.com/Y8eQWBA.png)  
![App screenshot](https://i.imgur.com/e7aTPgC.png)  
![App screenshot](https://i.imgur.com/zuRWZAD.png)  
![App screenshot](https://i.imgur.com/W9OLoGE.png)  
![App screenshot](https://i.imgur.com/VTl6mtY.png)  

### 구현 로직  
``` javascript
// 비밀번호 검증 정규표현식, 특수문자 1개, 대문자 1개, 8자 이상
const validatePassword = (password: string) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};
```  
``` javascript
// use-register-from.ts
export const useRegisterForm = () => {
  const { client } = useClerk();

  const navigate = useNavigate();

  // result-state
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // user-input
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  // email-state
  const {
    emailAddress,
    isValidEmail,
    isVerified,
    onChangeEmailAddress,
    emailVerificationCode,
    onChangeEmailVerificationCode,
    handleCompleteEmailVerification,
    startEmailVerification,
    isError: isVerifyError,
    isSuccess: isVerifySuccess,
    errMsg: verifyErrMsg,
  } = useEmailForm();

  // match-pwd
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
```  
``` javascript
  // 비밀번호 검증 로직
    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setErrMsg("");
    setIsError(false);

    if (name === "password" && !validatePassword(value)) {
      setErrMsg(
        "비밀번호는 최소 8자리, 대소문자, 숫자, 특수문자를 포함해야 합니다."
      );
      setIsError(true);
    }

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
```  
``` javascript
  // 비밀번호 일치 검증 로직
    const isMatchedPassword = () => {
    if (matchPassword === user.password) {
      setValidMatch(true);
    } else {
      setValidMatch(false);
    }
  };

  useEffect(() => {
    isMatchedPassword();

    if (validMatch) {
      setIsError(false);
      setErrMsg("");
    } else {
      setIsError(true);
      setErrMsg("비밀번호가 일치하지 않습니다.");
    }
  }, [matchPassword, validMatch]);
```  
``` javascript
  // 회원 가입 로직

  /* 
    clerk는 signUp 이후 이메일 인증 훅을 사용할 수 있기 때문에,
    clerk에 유저 정보를 등록해준다
  */
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError(false);
    setErrMsg("");

    if (!validMatch) return;

    setIsLoading(true);
    try {
      await client.signUp.create({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        emailAddress,
      });

      setIsSignup(true);
    } catch (err: unknown) {
      setIsError(true);
      setErrMsg("회원가입 실패입니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  /* 
    이메일 인증하기 버튼 클릭 후 동작이다 
    이메일 검증 이후 성공/실패 여부에 따라,
    실패 시 delete 요청을 보내고 서버에서 clerk에 등록된 유저까지 handle한다
  */
  const handleVerify = async () => {
    try {
      await handleCompleteEmailVerification();

      navigate("/join/success");
    } catch (err) {
      const { user } = useUser();
      if (user) {
        try {
          await restFetcher({
            path: `/user/${user.id}`,
            method: "DELETE",
          });
        } catch (err) {
          toast.error("서버 오류입니다. 잠시 후 다시 시도해주세요.");
        } finally {
          navigate("/join/failure");
        }
      }
    }
  };

```  
``` javascript
// use-email-form.ts
...
  // 이메일 input값 세팅 진행, 이메일 인증 비지니스 로직은 useEmailVerification에 위임
  const { startEmailVerification, completeEmailVerification, isVerified } =
    useEmailVerification({
      onStart: () => {
        setIsError(false);
        setErrMsg("");
      },
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (msg: string) => {
        setIsError(true);
        setErrMsg(msg);
      },
    });

  const handleCompleteEmailVerification = async () => {
    await completeEmailVerification(emailVerificationCode);
  };
```  
``` javascript
// use-email-verification.ts
export const useEmailVerification = ({
  onStart,
  onError,
  onSuccess,
}: UseEmailVerificationParams) => {
  const { client } = useClerk();

  const [isVerified, setIsVerified] = useState(false);

  const startEmailVerification = async () => {
    onStart();
    try {
      const { status } = await client.signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      onSuccess();

      return status === "complete";
    } catch (err) {
      onError("이메일을 전송하지 못했습니다. 다시 시도해주세요.");
    }
  };

  const completeEmailVerification = async (code: string) => {
    onStart();
    try {
      await client.signUp.attemptEmailAddressVerification({ code });
      setIsVerified(true);
    } catch (err) {
      setIsVerified(false);
      // 이메일 폼에서는 에러 상태를 받아 다시 이메일 코드를 전송할 수 있도록 한다
      onError("잘못된 인증 코드입니다. 다시 시도해주세요.");
    }
  };

  return {
    startEmailVerification,
    completeEmailVerification,
    isVerified,
  };
};
```  
### 404 페이지  
![App screenshot](https://i.imgur.com/aK4kl0r.png)  

### 잡설  
![App screenshot](https://i.imgur.com/zV21W8v.png)  
배포 이후에 지인들에게 테스트를 부탁해보며 많은 에러들을 고치고 있습니다.  
사이드 프로젝트가 아닌 실제 서비스 중인 상황이었다면 중대한 문제 상황이었겠죠.  
테스트와 더블 체크를 거듭해도 어차피 문제 상황은 끊임없이 생기는 것 같습니다.  
테스트란 내가 생각할 수 있는 범위 내의 문제 상황이니까요.  
하루에 많은 양의 코드를 짜기 보다는 고려할 요소들을 늘리는 방향으로 가고,  
코드를 많이 작성하고 있다면 내가 버그들을 만들고 있지는 않은가 항상 인식 해야될 것 같습니다.  
감사합니다.
## 
