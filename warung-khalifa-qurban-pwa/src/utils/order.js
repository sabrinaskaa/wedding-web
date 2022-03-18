export const getShippingChannelLabel = order => {
  if (order?.shippings?.length !== 0) {
    if (order?.shippings[0]?.shippingChannel?.code === "pickup") {
      return "Ambil Sendiri";
    }
    if (order?.shippings[0]?.shippingChannel?.code === "dine-in") {
      return "Dine In";
    }
    if (order?.shippings[0]?.shippingChannel?.code === "delivery") {
      return "Pesan Antar";
    }
    if (order?.shippings[0]?.shippingChannel?.code !== "delivery") {
      return `${order?.shippings[0]?.shippingChannel?.name} - ${order?.shippings[0]?.shippingChannel?.service?.name}`;
    }
  }
  if (order.isShippingRequired === false) {
    return "Produk Digital";
  }
  return `${order.shippings[0]?.shippingChannel.name} - ${order.shippings[0].shippingChannel.service.name}`;
};

export const getOrderPaymentStatusBackgroundColor = order => {
  if (order.status === "PENDING") {
    return "#FF722C";
  }
  if (
    order.status === "HOLD" ||
    order.status === "PROCESSING" ||
    order.status === "COMPLETED"
  ) {
    return "#2DBE78";
  }
  if (order.status === "CANCELLED" || order.status === "REFUNDED") {
    return "#EB4755";
  }
  if (order.status === "FAILED") {
    return "#808080";
  }
  return "transparent";
};

export const getOrderStatusPaymentLabel = order => {
  if (
    order.payments[0].paymentChannel.name === "Cash on delivery" &&
    order.status === "PENDING"
  ) {
    return "Menunggu Konfirmasi";
  }
  if (order.status === "PENDING") {
    return "Menunggu Pembayaran";
  }
  if (order.status === "HOLD" || order.status === "PROCESSING") {
    return "Pesanan Dalam Proses";
  }
  if (order.status === "COMPLETED") {
    return "Selesai";
  }
  if (order.status === "CANCELLED") {
    return "Dibatalkan";
  }
  if (order.status === "REFUNDED") {
    return "Dikembalikan";
  }
  if (order.status === "FAILED") {
    return "Gagal";
  }
  return order.status;
};
