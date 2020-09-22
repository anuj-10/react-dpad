import axios from "axios";

const url = `http://prod.api.indiascience.in/catalog_lists/`;

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
      return {
        title: value.display_title,
        image: value.thumbnails,
        id: index,
      };
    });
  } catch (error) {
    console.error(error);
  }
};
