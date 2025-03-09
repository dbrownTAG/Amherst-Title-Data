import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// ScrollToTop component to reset scroll position when navigating
const ScrollToTop: React.FC = () => {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Check if the pathname has changed (navigating between sections)
    const isNewPathname = prevPathname.current !== location.pathname;
    
    // Update the previous pathname reference
    prevPathname.current = location.pathname;
    
    // If navigating to a new section (pathname changed), always scroll to top
    if (isNewPathname) {
      window.scrollTo(0, 0);
      return;
    }
    
    // If staying on the same section but hash changed, scroll to the element
    if (location.hash) {
      // For hash navigation, we need to wait a bit for the DOM to update
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        }
      }, 100);
    } else {
      // If no hash and same pathname, still scroll to top
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

export default ScrollToTop; 