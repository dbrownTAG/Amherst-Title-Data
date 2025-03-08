import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop component to reset scroll position when navigating
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop; 