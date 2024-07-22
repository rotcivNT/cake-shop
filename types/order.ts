import { CakeProduct } from "./product";

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

export enum PaymentType {
  VN_PAY = "vnpay",
  COD = "cod",
}

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  SHIPPING = "SHIPPING",
  CANCELLED = "CANCLLED",
}

export interface PaymentDetail {
  id: string;
  amount: number;
  status: PaymentStatus;
  type: PaymentType;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetailFull {
  id: string;
  variantId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  productJson: string;
  price: number;
  product?: CakeProduct;
}

export interface Order {
  id: string;
  total: number;
  userJson: string;
  description: string;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  orderDetailsFull: OrderDetailFull[];
  paymentDetail: PaymentDetail;
  status: OrderStatus;
}
