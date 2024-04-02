import Spinner from "../../../../../_components/common/Spinner";

import { ReferrerAuthorsLoadingComponent } from "./ReferrerAuthorsLoading";

export const AuthorLoadingComponent = () => {
  return (
    <div className="details-author-info">
      <div className="details-author-info__horizontal">
        <div className="details-author-info__horizontal__contents">
          <h1>작가정보</h1>
          <div
            className="details-author-info__horizontal__contents__inner"
            style={{ width: "864px", height: "448px" }}
          >
            <Spinner text="작가 정보가 아직 등록되지 않았습니다" />
          </div>
        </div>
        <ReferrerAuthorsLoadingComponent />
      </div>
    </div>
  );
};
