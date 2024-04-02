import { Suspense, useEffect, useRef, useState } from "react";

import { useUser } from "@clerk/clerk-react";

import { useParams } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { setGNBCategory } from "../../../recoil/use-category";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../../lib/react-query/query-key";
import { QueryFns } from "../../../lib/react-query/queryFn";
import { daysToMs } from "../../../lib/react-query/utils";
import { useHandleError } from "../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../api/constants/errorDetails";
import { increaseView } from "./services/increaseView";

import { cn } from "../../../lib/utils";
import Spinner from "../../../_components/common/Spinner";

import { useObserver } from "./hooks/use-observer";
import { useRecordSeenBook } from "./hooks/use-record-seen-book";
import { GNB } from "../../lang/[lang]/_components";
import { SearchSection } from "../../_components";
import SingleBook from "./_components/singleBook/SingleBook";
import FixedPurchaseShortcut from "./_components/FixedPurchaseShortcut";
import FixedDetailsTabList from "./_components/FixedDetailsTabList";
import FAQ from "./_components/faq/FAQ";
import { AuthorInfoAsync } from "./_components/author/LazyAuthorInfo";
import { AuthorLoadingComponent } from "./_components/author/AuthorLoading";
import { BookReviewsAsync } from "./_components/book/LazyBookReviews";
import { DetailsContentsAsync } from "./_components/LazyDetailsContents";

export type DetailsIndexIds = "prod-info" | "prod-review";

export default function DetailsIndex() {
  const params = useParams();

  const { user } = useUser();
  const { bookId } = params;
  const setCategory = useSetRecoilState(setGNBCategory);

  const prodInfoRef = useRef(null);
  const reviewRef = useRef(null);

  const [currSellType, setCurrSellType] = useState<SellWay>("종이책");

  const { setReObserve, isInView } = useObserver({
    ref1: prodInfoRef,
    ref2: reviewRef,
  });

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.BOOK, bookId],
    queryFn: () => QueryFns.GET_BOOK(bookId!),
    staleTime: daysToMs(14),
    gcTime: daysToMs(17),
    enabled: !!bookId,
  });

  useHandleError({ error, isError, errorDetails: ERROR_DETAILS.GET_BOOK });

  useEffect(() => {
    setCategory({
      parentCategory: data?.parentCategory || null,
      category: data?.category,
    });
    setReObserve(true);
  }, [isSuccess]);

  useEffect(() => {
    if (bookId) {
      increaseView(bookId);
    }
  }, [bookId]);

  useRecordSeenBook({ bookId, userId: user?.id, category: data?.category });

  if (isLoading) return <DetailsIndexLoadingComponent />;

  if (isSuccess && data) {
    return (
      <>
        <SearchSection />
        <FixedDetailsTabList isInView={isInView} />
        <GNB />
        <SingleBook
          book={data}
          currSellType={currSellType}
          setCurrSellType={setCurrSellType}
        />
        <Suspense>
          <DetailsContentsAsync
            ref={prodInfoRef}
            bookId={bookId}
            category={data?.category}
            lang={data.parentCategory}
            setReObserve={setReObserve}
          />
        </Suspense>
        <Suspense fallback={<AuthorLoadingComponent />}>
          <AuthorInfoAsync authorName={data.author} />
        </Suspense>
        <Suspense>
          <BookReviewsAsync ref={reviewRef} bookId={bookId} />
        </Suspense>
        <FAQ />
        <FixedPurchaseShortcut
          price={currSellType === "종이책" ? data.price : data.eBookPrice}
          book={data}
        />
      </>
    );
  }
}

function DetailsIndexLoadingComponent() {
  return (
    <>
      <SearchSection />
      <FixedDetailsTabList />
      <GNB />
      <div className={cn("details-single-book", "loading")}>
        <Spinner text="데이터를 불러오는 중 입니다" />
      </div>
    </>
  );
}
