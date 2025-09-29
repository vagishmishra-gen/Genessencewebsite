import { useLocation, useNavigate } from 'react-router-dom';

const useSmartNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === '/';

  const navigateToSection = (sectionId) => {
    if (isLandingPage) {
      // Already on landing page - smooth scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages - navigate to landing page with section hash
      navigate(`/#${sectionId}`);
    }
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  const handleLogoClick = () => {
    if (isLandingPage) {
      // Scroll to top of landing page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate back to landing page
      navigate('/');
    }
  };

  const handleStartProject = () => {
    navigateToSection('lead-capture');
  };

  return {
    navigateToSection,
    navigateToPage,
    handleLogoClick,
    handleStartProject,
    isLandingPage
  };
};

export default useSmartNavigation;
