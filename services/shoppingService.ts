// "use server";

import { CreateOrderDto, PostPaymentDto } from "./payloadType";

const BASE_URL = process.env.NEXT_PUBLIC_SHOPPING_BACK_END_URL as string;

export const updateShoppingCart = async (payload: any) => {
  console.log(payload);

  const response = await fetch(`${BASE_URL}/add-to-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return {
      code: 1,
      msg: "Success",
    };
  } else {
    return {
      code: 0,
      message: "Something went wrong",
    };
  }
};

export const getShoppingCart = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (e) {
    return {
      code: -1,
      e,
    };
  }
};

export const createOrder = async (payload: CreateOrderDto) => {
  const response = await fetch(`${BASE_URL}/create-payment`, {
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
      msg: "Success",
      data,
    };
  } else {
    return {
      code: 0,
      message: "Something went wrong",
    };
  }
};

export const handlePostPayment = async (payload: PostPaymentDto) => {
  const response = await fetch(`${BASE_URL}/post-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    return {
      code: 1,
      msg: "Success",
    };
  } else {
    return {
      code: 0,
      message: "Something went wrong",
    };
  }
};

export const getOrderByUser = async (userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/get-orders-by-user/${userId}`);

    if (response.ok) {
      return response.json();
    }
    return null;
  } catch (e) {
    return {
      code: -1,
      e,
    };
  }
};

export const getAllOrders = async (orderId?: string) => {
  try {
    const res = await fetch(`${BASE_URL}/get-orders/${orderId ? orderId : ""}`);
    const data: any[] = await res.json();
    if (res.ok) {
      return {
        code: 1,
        msg: "success",
        data,
      };
    }
  } catch (e) {
    return {
      code: -1,
      msg: e,
    };
  }
};
