export const Order_Status = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const Payment_Status = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
} as const;

export const Payment_Method = {
  CASHONDELIVERY: 'cashOnDelivery',
  STRIPE: 'stripe',
} as const;
