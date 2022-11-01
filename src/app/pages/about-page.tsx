import AppBreadcrumbs from "app/components/app-breadcrumbs";

export default function AboutPage() {
  return (
    <div>
      <AppBreadcrumbs />
      <p>About page</p>
      <p>r-systems-react-front 1.0.0</p>
      <p>Copyright © 2023 Łukasz Rydzkowski</p>
      <p>
        <a href="https://github.com/lrydzkowski" target="_blank" rel="noreferrer">
          https://github.com/lrydzkowski
        </a>
      </p>
      <p>
        <a href="mailto: lukasz.rydzkowski@gmail.com">lukasz.rydzkowski@gmail.com</a>
      </p>
    </div>
  );
}
