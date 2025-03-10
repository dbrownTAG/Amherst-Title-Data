import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop component to reset scroll position when navigating
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Reset view position when navigating to a new page (no smooth scrolling)
    window.scrollTo(0, 0);
  }, [location.pathname]); // Only trigger on pathname changes, ignore hash changes

  return null;
};

export default ScrollToTop; 