const baseUrl = "https://api.unsplash.com/";
const apiKey = 'wByBC7DfdduaTb878fmIIFSfwffytKRkxycE0hqLtMo'
 const photosUrl = baseUrl + `search/photos/?client_id=${apiKey}&query=shirts`;
const fetchPhotos = async (searchURL, page) => {
  try {
    const response = await fetch(`${searchURL}&page=${!page ? null : page}`);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return error;
  }
};