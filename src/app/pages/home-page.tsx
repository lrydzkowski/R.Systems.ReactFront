import HomePageCard from "@app/components/common/home-page-card";
import useUrls, { Pages } from "@app/router/use-urls";
import "./home-page.css";

export default function HomePage() {
  const { getPath } = useUrls();

  return (
    <>
      <>
        <div className="home-page--cards">
          <div className="home-page--card">
            <HomePageCard
              title="Lexica"
              subtitle="English vocabulary learning web application."
              redirectUrl={getPath(Pages.sets)}
            />
          </div>
        </div>
      </>
    </>
  );
}
