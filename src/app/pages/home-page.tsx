import HomePageCard from "@app/components/common/home-page-card";
import { Pages, Urls } from "@app/router/urls";
import "./home-page.css";

export default function HomePage() {
  return (
    <>
      <>
        <div className="home-page--cards">
          <div className="home-page--card">
            <HomePageCard
              title="Lexica"
              subtitle="English vocabulary learning web application."
              redirectUrl={Urls.getPath(Pages.sets)}
            />
          </div>
        </div>
      </>
    </>
  );
}
