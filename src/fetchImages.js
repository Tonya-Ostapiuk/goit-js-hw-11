import axios from 'axios';

export const fetchImages = async (inputValue, pageNr) => {
  const response = await axios(
    `https://pixabay.com/api/?key=33208441-52fb7929803924197e6b021fa&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`)
 
  return response.data;   

};

   