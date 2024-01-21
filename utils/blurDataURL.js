const jimp = require('jimp')

export const blurDataURL = async (imageUrl, mime) => {
  const image = await jimp.read(imageUrl)
  return new Promise((resolve, reject) => {
    image.resize(128, 128)
    image.blur(32)
    image.getBase64(mime, (err, value) => {
      if (err) return reject(err)
      return resolve(value)
    })
  })
}
