import React, { useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <></>;
};

export default withRouter(ScrollToTop);
