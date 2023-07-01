import { useIsAuthenticated } from "@azure/msal-react";
import { useMemo } from "react";
import Hotkeys from "react-hot-keys";
import { useNavigate } from "react-router-dom";
import { Pages, Urls } from "@app/router/urls";

export default function NavigationHotkeys() {
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const links = useMemo(() => {
    if (!isAuthenticated) {
      return new Map<string, string>([
        ["1", Urls.getPath(Pages.login)],
        ["2", Urls.getPath(Pages.about)],
      ]);
    }

    return new Map<string, string>([
      ["1", Urls.getPath(Pages.home)],
      ["2", Urls.getPath(Pages.sets)],
      ["3", Urls.getPath(Pages.newSet)],
      ["4", Urls.getPath(Pages.about)],
    ]);
  }, [isAuthenticated]);

  const onKeyDown = (shortcut: string) => {
    const path = links.get(shortcut.replace("ctrl+", ""));
    if (!path) {
      return;
    }

    navigate(path);
  };

  const supportedDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      {supportedDigits.map((digit: number) => (
        <Hotkeys key={digit} keyName={`ctrl+${digit.toString()}`} filter={() => true} onKeyDown={onKeyDown}></Hotkeys>
      ))}
    </>
  );
}
