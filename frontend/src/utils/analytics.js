import axios from "axios";

const ANALYTICS_URL = `${import.meta.env.VITE_BACKEND_URL}/api/analytics/track`;

/*
|--------------------------------------------------------------------------
| Visitor ID
|--------------------------------------------------------------------------
| Identifies a browser/device without requiring the visitor to log in.
|--------------------------------------------------------------------------
*/

const getVisitorId = () => {
  let visitorId = localStorage.getItem("greenLeafVisitorId");

  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    localStorage.setItem(
      "greenLeafVisitorId",
      visitorId
    );
  }

  return visitorId;
};

/*
|--------------------------------------------------------------------------
| Session ID
|--------------------------------------------------------------------------
| A new session is created when the visitor starts a new browser session.
|--------------------------------------------------------------------------
*/

const getSessionId = () => {
  let sessionId = sessionStorage.getItem(
    "greenLeafSessionId"
  );

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    sessionStorage.setItem(
      "greenLeafSessionId",
      sessionId
    );
  }

  return sessionId;
};

/*
|--------------------------------------------------------------------------
| Device
|--------------------------------------------------------------------------
*/

const getDevice = () => {
  const width = window.innerWidth;

  if (width < 768) {
    return "mobile";
  }

  if (width < 1024) {
    return "tablet";
  }

  return "desktop";
};

/*
|--------------------------------------------------------------------------
| Send analytics event
|--------------------------------------------------------------------------
*/

export const trackEvent = async ({
  event,
  page,
  product,
  blog,
}) => {
  try {
    await axios.post(ANALYTICS_URL, {
      event,
      page:
        page ||
        `${window.location.pathname}${window.location.search}`,

      product,
      blog,

      visitorId: getVisitorId(),
      sessionId: getSessionId(),

      device: getDevice(),

      referrer: document.referrer || "",

      language: navigator.language || "",
    });
  } catch (error) {
    /*
     * Analytics should never break the website.
     *
     * We deliberately don't throw the error.
     */
    console.error(
      "Analytics tracking failed:",
      error
    );
  }
};

/*
|--------------------------------------------------------------------------
| Convenience functions
|--------------------------------------------------------------------------
*/

export const trackPageView = (page) => {
  return trackEvent({
    event: "page_view",
    page,
  });
};

export const trackProductView = ({
  id,
  name,
}) => {
  return trackEvent({
    event: "product_view",
    product: {
      id,
      name,
    },
  });
};

export const trackBlogView = ({
  id,
  title,
}) => {
  return trackEvent({
    event: "blog_view",
    blog: {
      id,
      title,
    },
  });
};

export const trackWhatsAppClick = () => {
  return trackEvent({
    event: "whatsapp_click",
  });
};

export const trackPhoneClick = () => {
  return trackEvent({
    event: "phone_click",
  });
};

export const trackMapClick = () => {
  return trackEvent({
    event: "map_click",
  });
};