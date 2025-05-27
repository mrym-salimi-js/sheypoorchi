import PageLoading from './PageLoading';

export const LoadingWrapper = ({ isLoading, children }) => {
  if (isLoading) {
    return <PageLoading />;
  }

  return <>{children}</>;
};
