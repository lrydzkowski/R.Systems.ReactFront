import HomePageCard from "app/components/home-page-card";
import { Urls } from "app/routing/urls";
import "./home-page.scoped.css";

export default function HomePage() {
  return (
    <>
      <div className="cards">
        <div className="card">
          <HomePageCard
            title="Lexica"
            subtitle="English vocabulary learning web application."
            redirectUrl={Urls.pages.sets.path}
          />
        </div>
        {/* <div className="card">
          <HomePageCard title="Tests" subtitle="Tests, PoC, and different ideas." redirectUrl={Urls.pages.test1.path} />
        </div> */}
      </div>
    </>
  );
}
