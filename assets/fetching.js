const baseUrl = "https://api.unsplash.com/";
const photosUrl = baseUrl + `search/photos/?client_id=${MY_API_KEY}&query=shirts`;

const fetchPhotos = async (searchURL,page) => {
  try {
    const response = await fetch(`${searchURL}&page=${!page? null:page}`);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return error;
  }
};

