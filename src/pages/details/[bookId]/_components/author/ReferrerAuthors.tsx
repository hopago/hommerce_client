import { MdArrowRight } from "react-icons/md";

import RefAuthor from "./RefAuthor";

import { useNavigate, useParams } from "react-router-dom";

import { AuthorType } from "../../../../_components/types/author";

import { useQuery } from "@tanstack/react-query";
import { QueryFns } from "../../../../../lib/react-query/queryFn";
import { QueryKeys } from "../../../../../lib/react-query/query-key";
import { daysToMs } from "../../../../../lib/react-query/utils";
import { useHandleError } from "../../../../hooks/use-handle-error";
import { ERROR_DETAILS } from "../../../../../api/constants/errorDetails";
import { ReferrerAuthorsLoadingComponent } from "./ReferrerAuthorsLoading";

type ReferrerAuthorsProps = {
  authorJob: AuthorType;
};

export default function ReferrerAuthors({ authorJob }: ReferrerAuthorsProps) {
  const { bookId } = useParams();

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [QueryKeys.AUTHORS_BOOK_REF, bookId],
    queryFn: () => QueryFns.FIND_REFERRER_CATEGORY_BEST_AUTHORS({ bookId }),
    staleTime: daysToMs(7),
    gcTime: daysToMs(9),
    enabled: !!bookId,
  });

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/author/best/${authorJob}`);
  };

  useHandleError({
    isError,
    error,
    errorDetails: ERROR_DETAILS.FIND_REFERRER_CATEGORY_BEST_AUTHORS,
  });

  if (isLoading) return <ReferrerAuthorsLoadingComponent />;

  if (isSuccess) {
    return (
      <div className="details-author-info__horizontal__ref-authors">
        <div className="details-author-info__horizontal__ref-authors__col">
          <div className="details-author-info__horizontal__ref-authors__col__heading">
            <h1>이 분야의 베스트</h1>
            <button onClick={onClick}>
              <span>더보기</span>
              <div className="icon-wrap">
                <MdArrowRight />
              </div>
            </button>
          </div>
          <ul>
            {data?.map((author) => (
              <RefAuthor key={author.name} author={author} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
