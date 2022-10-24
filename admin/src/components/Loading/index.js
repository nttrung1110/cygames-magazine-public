const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-700 opacity-50 z-50">
      <div className="border-primary border-8 border-r-transparent rounded-full inline-block w-40 h-40 align-text-bottom animate-spin"></div>
    </div>
  );
};

export default Loading;
