import { useNavigate } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { GNBModalState } from "../../../../recoil/nav-gnb";

type GNBCategoryProps = {
  category: BookParentCategory | BookSubCategory;
  type: "parent" | "sub";
  parentCategory: BookParentCategory | null | undefined;
};

export default function GNBCategory({
  category,
  type,
  parentCategory,
}: GNBCategoryProps) {
  const navigate = useNavigate();

  const setShow = useSetRecoilState(GNBModalState);

  const onClick = () => {
    if (type === "parent") {
      navigate(`/lang/${category}`);
    } else {
      navigate(`/category/${parentCategory}/${category.trim()}`);
    }
    setShow(false);
  };

  return (
    <li onClick={onClick}>
      <span>{category}</span>
    </li>
  );
}
