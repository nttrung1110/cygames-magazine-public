const cloudinary = require("../cloudinary");

exports.uploadImage = async (req, res) => {
  const { slug } = req.body;
  const { file } = req;

  // upload image to cloudinary, then return image url
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    file.path,
    {
      folder: `cygames-magazine/${slug}`, // create folder by article's slug in cloudinary
    }
  );

  res.json({ secure_url, public_id });
};
