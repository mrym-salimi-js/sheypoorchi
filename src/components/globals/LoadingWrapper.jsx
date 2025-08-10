import PageLoading from './PageLoading';

export const LoadingWrapper = ({ isLoading, children }) => {
  return (
    <>
      {children}
      {isLoading && <PageLoading />}
    </>
  );
};
