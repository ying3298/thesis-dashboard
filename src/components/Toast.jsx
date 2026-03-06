import { useData } from '../context/DataContext';
import { useEffect } from 'react';

export default function Toast() {
  const { toastMessage, dispatch } = useData();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 1800);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  if (!toastMessage) return null;

  return (
    <div className="toast" key={toastMessage + Date.now()}>
      <span style={{ color: 'var(--olive)' }}>{'\u2713'}</span> {toastMessage}
    </div>
  );
}
