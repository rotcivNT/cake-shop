"use server";
const baseURL = process.env.NEXT_PUBLIC_CATEGORY_BACK_END_URL;

export const getAllProductByCateId = async (cateId: string) => {
  try {
    const response = await fetch(`${baseURL}/get-category/${cateId}`);
    const data = await response.json();
    return {
      code: 1,
      data,
    };
  } catch (e) {
    console.log(e);
    return {
      code: -1,
      msg: e,
    };
  }
};
