export const imageToFile = (imgSrc) => {
  const byteString = atob(imgSrc.split(',')[1]);

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ia], {
    type: 'image/jpeg',
  });

  return blob;
};

export const objectToForm = async (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));

  return formData;
};
