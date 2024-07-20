

const baseURL = process.env.NEXT_PUBLIC_PRODUCT_BACK_END_URL;

export const getAllProduct = async (url: string, categoryId?: string) => {
  try {
    const response = await fetch(`${baseURL}/get-all-products${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId }),
    });
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

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(`${baseURL}/get-product/${id}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return {
      code: -1,
      msg: e,
    };
  }
};
