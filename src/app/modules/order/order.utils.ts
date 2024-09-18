export const orderIdGenerator = (prevId: string) => {
  if (!prevId) {
    return 'ORDER0001';
  }

  const subtractOrderDigit = parseInt(prevId.substring(5, 9));
  const incrementOrderId = (subtractOrderDigit + 1).toString();
  const paddedOrderId = incrementOrderId.padStart(4, '0');
  return `ORDER${paddedOrderId}`;
};
