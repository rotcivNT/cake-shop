export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export enum PaymentType {
  COD = "COD",
  VN_PAY = "VN_PAY",
}

export interface OrderDto {
  // private String id;
  // private String description;
  // private String userId;
  // private long total;
  // private String payment_id;
  id: string;
  description: string;
  userId: string;
  total: number;
  paymentId: string;
  shippingAddress: string;
}

export interface OrderDetailDto {
  // private String productId;
  // private int quantity;
  // private String orderId;
  productId: string;
  quantity: number;
  orderId: string;
  variantId: string;
  price: number
}

export interface PaymentDetailDto {
  // private String id;
  // private long amount;
  // private String status;
  // private String type;
  id: string;
  amount: number;
  status: PaymentStatus;
  type: PaymentType;
}

export interface CreateOrderDto {
  order: OrderDto;
  orderDetails: OrderDetailDto[];
  paymentDetail: PaymentDetailDto;
}

export interface PostPaymentDto {
  // private String resVnPayCode;
  //   private String paymentId;
  //   private String orderId;
  //   private String shoppingSessionId;
  resVnPayCode: string;
  paymentId: string;
  orderId: string;
  userId: string;
}
