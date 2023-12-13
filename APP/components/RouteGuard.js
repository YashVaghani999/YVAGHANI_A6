import { isAuthenticated } from "../lib/Authenticate";
import { getFavourites, getHistory } from "../lib/userData";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PUBLIC_PATHS = ["/login", "/register", "/", "/_error"];

export default function RouteGuard(props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const authCheck = (url) => {
      const path = url.split("?")[0];
      if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
        setAuthorized(false);
        router.push("/login");
      } else {
        setAuthorized(true);
      }
    };

    const updateAtoms = async () => {
      setFavouritesList(await getFavourites());
      setSearchHistory(await getHistory());
    };

    updateAtoms();
    authCheck(router.pathname);

    const handleRouteChange = (url) => authCheck(url);
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [setAuthorized, setFavouritesList, setSearchHistory, router]);

  return <>{authorized && props.children}</>;
}
