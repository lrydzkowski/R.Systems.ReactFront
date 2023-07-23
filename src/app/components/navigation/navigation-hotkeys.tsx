import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import Hotkeys from "react-hot-keys";
import { useNavigate } from "react-router-dom";
import useUrls, { Pages } from "@app/router/use-urls";

export default function NavigationHotkeys() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const { getPath } = useUrls();
  const links = useMemo(() => {
    if (!isAuthenticated) {
      return new Map<string, string>([
        ["1", getPath(Pages.login)],
        ["2", getPath(Pages.about)],
      ]);
    }

    return new Map<string, string>([
      ["1", getPath(Pages.home)],
      ["2", getPath(Pages.sets)],
      ["3", getPath(Pages.newSet)],
      ["4", getPath(Pages.about)],
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
