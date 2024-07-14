"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_BACK_END_URL as string;
export const updateUser = async (payload: any) => {
  const response = await fetch(`${BASE_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const data = await response.json();
    return {
      code: 1,
      data,
    };
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const res = await fetch(`${BASE_URL}/user/${email}`);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return {
      code: 0,
      message: "NOT FOUND",
    };
  } catch (e) {
    return e;
  }
};
