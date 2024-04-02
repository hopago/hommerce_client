import { MdArrowRight } from "react-icons/md";

import Spinner from "../../../../../_components/common/Spinner";

export const ReferrerAuthorsLoadingComponent = () => {
  return (
    <div className="details-author-info__horizontal__ref-authors">
      <div className="details-author-info__horizontal__ref-authors__col">
        <div className="details-author-info__horizontal__ref-authors__col__heading">
          <h1>이 분야의 베스트</h1>
          <button>
            <span>더보기</span>
            <div className="icon-wrap">
              <MdArrowRight />
            </div>
          </button>
        </div>
        <ul>
          <Spinner text="작가 정보가 아직 등록되지 않았습니다" />
        </ul>
      </div>
    </div>
  );
};
