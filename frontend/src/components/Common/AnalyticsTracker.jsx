import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { trackPageView } from "../../utils/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const page =
      `${location.pathname}${location.search}`;

    trackPageView(page);
  }, [
    location.pathname,
    location.search,
  ]);

  return null;
};

export default AnalyticsTracker;