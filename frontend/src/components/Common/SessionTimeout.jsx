import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";

const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes

const SessionTimeout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const timeoutRef = useRef(null);

  useEffect(() => {
    // No logged-in user = no session timeout
    if (!user) {
      return;
    }

    const logoutUser = () => {
      dispatch(logout());
      navigate("/", { replace: true });
    };

    const resetTimer = () => {
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        logoutUser();
      }, INACTIVITY_LIMIT);
    };

    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Start the 30-minute timer
    resetTimer();

    return () => {
      clearTimeout(timeoutRef.current);

      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [user, dispatch, navigate]);

  return null;
};

export default SessionTimeout;