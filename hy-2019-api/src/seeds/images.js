module.exports = async (app) => {
  try {
    const Image = app.service('images');
    const images = await Image.find();

    const cloudinaryUrls = [
      'https://res.cloudinary.com/paul-teacode/image/upload/v1568491398/the-science-behind-cigarette-butt-trash_vehefe.jpg',
      'https://res.cloudinary.com/paul-teacode/image/upload/v1568491398/compressed_Bentgrass_nynwz1.jpg',
      'https://res.cloudinary.com/paul-teacode/image/upload/v1568491398/download_1_tbfch7.jpg',
      'https://res.cloudinary.com/paul-teacode/image/upload/v1568491398/download_3_fteqcb.jpg',
      'https://res.cloudinary.com/paul-teacode/image/upload/v1568491398/download_5_bxkonj.jpg',
      'https://res.cloudinary.com/paul-teacode/image/upload/v1568491398/download_6_xlmys0.jpg',
      'https://res.cloudinary.com/paul-teacode/image/upload/v1568491398/download_4_mh7d3t.jpg',
      'https://res.cloudinary.com/paul-teacode/image/upload/v1568491398/download_2_nnywrk.jpg',
    ];

    if (images.total < cloudinaryUrls.length) {
      const promises = cloudinaryUrls.map((url) => {
        return Image.create({
          cloudinary: url
        });
      });

      return Promise.all(promises);
    }

    return images.data;
  } catch (e) {
    console.log(e);
  }
};
