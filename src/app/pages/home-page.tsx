import HomePageCard from "app/components/home-page-card";
import "./home-page.scoped.css";

export default function HomePage() {
  return (
    <>
      <div className="cards">
        <div className="card">
          <HomePageCard
            title="Lexica"
            subtitle="English vocabulary learning web application."
            redirectUrl="/lexica/sets"
          />
        </div>
        <div className="card">
          <HomePageCard title="Tests" subtitle="Tests, PoC, and different ideas." redirectUrl="/test/test1" />
        </div>
      </div>
    </>
  );
}
