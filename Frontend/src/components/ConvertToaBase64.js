const convertToaBase64 = (e,func) => {
  const reader = new FileReader();
  if (e.target.files[0] == undefined) {
    ("");
  } else {
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async () => {
      const img = reader.result;
      func(img);
    };
  }
  reader.onerror = (error) => {
    console.log(error);
  };
};

export default convertToaBase64
