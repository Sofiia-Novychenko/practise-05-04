import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Header from './components/Header/Header';

import { useDispatch } from 'react-redux';
import { fetchBaseCurrency } from './reduxState/currency/operations';
import { setBaseCurrency } from './reduxState/currency/currencySlice';

const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));
const Loader = lazy(() => import('./components/Loader/Loader'));

export const App = () => {
  const dispatch = useDispatch();
  // const isLoading = useSelector(state => state.tasks.isLoading);
  // const error = useSelector(state => state.tasks.error);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    const success = ({ coords }) => {
      dispatch(fetchBaseCurrency(coords));
    };
    const error = () => {
      dispatch(setBaseCurrency('USD'));
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/rates" element={<Rates />} />
        </Route>
        {/* {isLoading && !error && <b>Request in progress...</b>} */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
