import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  doc,
  updateDoc
} from "firebase/firestore";

import app from "../firebase/firebase";

import {
  getReferralCode
} from "../affiliate/referralTracker";

import {
  createNotification
} from "./notifications";

const db = getFirestore(app);

// Send notifications without making a successful order operation fail.
async function notifyCustomer(userId, notification) {
  if (!userId) {
    console.warn(
      "Notification skipped: this order has no customer userId."
    );
    return;
  }

  try {
    await createNotification(userId, notification);
  } catch (error) {
    console.error(
      "Order saved, but notification could not be created:",
      error
    );
  }
}

// Create a new order.
export async function createOrder(order) {
  const referralCode = getReferralCode();

  const orderData = {
    ...order,
    referralCode: referralCode || null,
    paymentStatus: "pending",
    orderStatus: "pending",
    createdAt: new Date()
  };

  const orderRef = await addDoc(
    collection(db, "orders"),
    orderData
  );

  await notifyCustomer(order.userId, {
    title: "Order Received",
    message:
      "Your KuroKage order has been received. We'll keep you updated as it progresses.",
    type: "order_placed",
    orderId: orderRef.id
  });

  return orderRef;
}

// Update payment status and notify the customer.
export async function updateOrderPaymentStatus(
  orderId,
  paymentStatus
) {
  const orderRef = doc(db, "orders", orderId);
  const orderSnapshot = await getDoc(orderRef);

  if (!orderSnapshot.exists()) {
    throw new Error("Order not found.");
  }

  const order = orderSnapshot.data();

  await updateDoc(orderRef, {
    paymentStatus,
    updatedAt: new Date()
  });

  await notifyCustomer(order.userId, {
    title: "Payment Status Updated",
    message: `Your KuroKage order payment status is now: ${paymentStatus}.`,
    type: "payment_status",
    orderId
  });
}

// Update order status and notify the customer.
export async function updateOrderStatus(
  orderId,
  orderStatus
) {
  const orderRef = doc(db, "orders", orderId);
  const orderSnapshot = await getDoc(orderRef);

  if (!orderSnapshot.exists()) {
    throw new Error("Order not found.");
  }

  const order = orderSnapshot.data();

  await updateDoc(orderRef, {
    orderStatus,
    updatedAt: new Date()
  });

  await notifyCustomer(order.userId, {
    title: "Order Status Updated",
    message: `Your KuroKage order status is now: ${orderStatus}.`,
    type: "order_status",
    orderId
  });
}

// Get all orders for the admin dashboard.
export async function getOrders() {
  const ordersQuery = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
}

// Get orders belonging to one customer.
export async function getOrdersByUser(userId) {
  if (!userId) {
    throw new Error("A customer user ID is required.");
  }

  const ordersQuery = query(
    collection(db, "orders"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  }));
}
