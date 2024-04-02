import { useParams } from "react-router-dom";

import { SearchSection } from "../../_components";
import {
  ADBanner,
  GNB,
  SideNavbar,
  Picks,
  TrendSearchTerm,
  NewBooks,
} from "./_components";

export default function LangIndex() {
  const { category } = useParams();

  return (
    <>
      <SearchSection />
      <GNB />
      <main>
        <SideNavbar />
        <section>
          <ADBanner />
          <Picks />
          <TrendSearchTerm />
          {category && (
            <NewBooks bookSubCategory={category as BookSubCategory} />
          )}
        </section>
      </main>
    </>
  );
}
