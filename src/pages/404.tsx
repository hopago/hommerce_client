import { useNavigate } from "react-router-dom";

import ReuseButton from "../_components/common/CommonButton";
import FixedSearchBar from "./_components/FixedSearchBar";

import noContent from "../assets/img_no-results.png";

import { useSearchForm } from "./hooks/use-search-form";
import { Footer } from "./_components";

export default function NotFound() {
  const { onSubmit, onChange, searchTerm } = useSearchForm();

  const navigate = useNavigate();

  const handleNavHome = () => {
    navigate("/");
  };

  const handleNavPrev = () => {
    navigate(-1);
  };

  return (
    <div className="not-found">
      <FixedSearchBar
        onChange={onChange}
        searchTerm={searchTerm}
        onSubmit={onSubmit}
      />
      <div className="not-found__wrap">
        <img src={noContent} alt="no-content" />
        <div className="texts">
          <span>찾을 수 없는 페이지 입니다.</span>
          <p>입력한 주소를 다시 한 번 확인해주세요.</p>
        </div>
        <div className="btns">
          <ReuseButton
            style="default"
            size="lg"
            text="Hommerce 홈"
            type="button"
            onClick={handleNavHome}
          />
          <ReuseButton
            style="purple"
            size="lg"
            text="이전 페이지"
            type="button"
            onClick={handleNavPrev}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
