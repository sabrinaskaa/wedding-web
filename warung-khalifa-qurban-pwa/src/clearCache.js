import React, { useState, useEffect } from "react";

function withClearCache(Component) {
  function ClearCacheComponent(props) {
    const [isLatestBuildDate, setIsLatestBuildDate] = useState(false);

    useEffect(() => {
      fetch("/meta.json")
        .then(response => response.json())
        .then(meta => {
          const latestVersionDate = meta.buildDate.toString();
          const currentVersionDate = localStorage.getItem("version");

          if (latestVersionDate !== currentVersionDate) {
            setIsLatestBuildDate(false);
            refreshCacheAndReload();
            localStorage.setItem("version", latestVersionDate);
          } else {
            setIsLatestBuildDate(true);
          }
        });
    }, []);

    const refreshCacheAndReload = () => {
      if (caches) {
        // Service worker cache should be cleared with caches.delete()
        caches.keys().then(names => {
          for (const name of names) {
            caches.delete(name);
          }
        });
      }
      const first = localStorage.getItem("first", false);
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("first", first);
      // delete browser cache and hard reload
      window.location.reload(true);
    };

    return (
      <React.Fragment>
        {isLatestBuildDate ? <Component {...props} /> : null}
      </React.Fragment>
    );
  }

  return ClearCacheComponent;
}

export default withClearCache;
