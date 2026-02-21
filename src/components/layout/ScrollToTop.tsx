import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
            document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
            document.body.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        };

        scrollToTop();
        // Use a small timeout to catch browsers that restore scroll position after load
        const timeoutId = setTimeout(scrollToTop, 0);
        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
