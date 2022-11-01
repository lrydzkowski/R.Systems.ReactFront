import AppBreadcrumbs from "app/components/app-breadcrumbs";

export default function HomePage() {
  console.log(process.env.NODE_ENV);

  return (
    <>
      <AppBreadcrumbs />
      <p>Home page</p>
    </>
  );
}
