import parse from "html-react-parser";

import "./ArticleBody.scss";

const DeviceView = ({ thumbnail, title, content, setShowDeviceView }) => {
  const handleClose = (e) => {
    if (e.target.id === "DeviceViewContainer") {
      setShowDeviceView(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      id="DeviceViewContainer"
      className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        className="bg-white rounded overflow-auto px-2"
        style={{ width: "50%", height: "98%" }}
      >
        <h1 className="text-xl font-semibold text-gray-700 border-b-2 border-gray-500 pb-2 m-2">
          {title}
        </h1>
        {thumbnail && (
          <img src={thumbnail} className="aspect-video mx-auto" alt="" />
        )}
        <div className="article-body px-8">{parse(content)}</div>
      </div>
    </div>
  );
};

export default DeviceView;
