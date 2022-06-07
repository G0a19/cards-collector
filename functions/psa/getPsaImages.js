const axios = require("axios").default;

const getPsaImages = async function (data) {
  try {
    const response = await axios.request({
      url: "https://www.psacard.com/GetPSACertImages",
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data,
    });
    const images = [];
    response.data.PSACertImages.forEach((image) => {
      images.push(image.ImageUrl);
    });
    return images;
  } catch (err) {
    console.log(err);
  }
};

module.exports = [getPsaImages];
