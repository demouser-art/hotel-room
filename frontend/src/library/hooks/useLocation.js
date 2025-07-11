import { useLocation as useRouterLocation } from 'react-router-dom';

const useLocation = () => {
  const location = useRouterLocation();
  return {
    href: window.location.href,
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
  };
};

export { useLocation };
export default useLocation;