import axios from "axios";
import md5 from "md5";

const url = `http://prod.api.indiascience.in/catalog_lists/`;
const video_parameters = "?service_id=6&play_url=yes&protocol=hls&us=";
const hash_string = "ywVXaTzycwZ8agEs3ujx";

export const fetchAllCategories = async () => {
  let changeableUrl = `${url}/all-categories-list?region=IN&auth_token=Ts4XpMvGsB2SW7NZsWc3`;

  try {
    const {
      data: {
        data: { catalog_list_items },
      },
    } = await axios.get(changeableUrl);
    return catalog_list_items.map((data, index) => {
      return { title: data.display_title, link: data.home_link, id: index };
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchCategoryData = async (categoryName) => {
  try {
    const {
      data: {
        data: { catalog_list_items },
      },
    } = await axios.get(
      `${url}/${categoryName}?region=IN&auth_token=Ts4XpMvGsB2SW7NZsWc3`
    );
    return catalog_list_items.map((value, index) => {
      const url = value.smart_url + video_parameters;
      const hash = md5(hash_string + url);
      return {
        title: value.display_title,
        image: value.thumbnails,
        id: index,
        url: `${url}${hash}`,
      };
    });
  } catch (error) {
    console.error(error);
  }
};
