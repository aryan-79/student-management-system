const Wrapper = ({ children }) => {
  return (
    <div className="h-[calc(100vh-6rem)] px-4 md:px-16 lg:px-4 md:mx-8 lg:mx-10 xl:mx-24 grid place-items-center">
      {children}
    </div>
  );
};

export default Wrapper;
