"use server";

import { CategoryProps } from "@/types/category";

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
    return {
      code: -1,
      msg: e,
    };
  }
};

export const getAllCategory = async () => {
  try {
    const response = await fetch(`${baseURL}/get-all-category`);
    if (response.ok) {
      const data = await response.json();
    return {
      code: 1,
      data,
    };
    } 
    return {
      code: -1,
      msg: "Error",
    };
  } catch (e) {
    console.log(e);
    return {
      code: -1,
      msg: e,
    };
  }
}

export const getAllChildByParentId = async (parentId: string) => {
  try {
    const response = await fetch(`${baseURL}/get-child-category/${parentId}`);
    if (response.ok) {
      const data = await response.json();
    return {
      code: 1,
      data,
    };
    }
    return {
      code: -1,
      msg: "Error",
    };
  } catch (e) {
    console.log(e);
    return {
      code: -1,
      msg: e,
    };
  }
}

export const getCategoryByName = async (name: string) => {
  try {
    const response = await fetch(`${baseURL}/get-category-by-name/${name}`);
    if (response.ok) {
      const data: CategoryProps = await response.json();
    return {
      code: 1,
      data,
    };
    }
    return {
      code: -1,
      msg: "Error",
    };
  } catch (e) {
    console.log(e);
    return {
      code: -1,
      msg: e,
    };
  }
}