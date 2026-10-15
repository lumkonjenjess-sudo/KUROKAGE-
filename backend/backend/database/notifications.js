
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

import app from "../firebase/firebase";

const db = getFirestore(app);

const notificationsCollection = collection(
  db,
  "notifications"
);

export async function createNotification(
  userId,
  notification
) {
  if (!userId) {
    throw new Error("A user ID is required.");
  }

  return await addDoc(notificationsCollection, {
    title: notification.title || "KuroKage Update",
    message: notification.message || "",
    type: notification.type || "general",
    read: false,
    createdAt: new Date(),
    ...notification,
    userId
  });
}

export async function getNotifications(userId) {
  if (!userId) {
    throw new Error("A user ID is required.");
  }

  const notificationsQuery = query(
    notificationsCollection,
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(notificationsQuery);

  const results = snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data()
  }));

  // Sort newest first without requiring a composite index.
  results.sort((a, b) => {
    const dateA = a.createdAt?.toDate
      ? a.createdAt.toDate().getTime()
      : new Date(a.createdAt || 0).getTime();

    const dateB = b.createdAt?.toDate
      ? b.createdAt.toDate().getTime()
      : new Date(b.createdAt || 0).getTime();

    return dateB - dateA;
  });

  return results;
}

async function getOwnedNotification(userId, notificationId) {
  if (!userId || !notificationId) {
    throw new Error("User ID and notification ID are required.");
  }

  const notificationRef = doc(
    db,
    "notifications",
    notificationId
  );

  const snapshot = await getDoc(notificationRef);

  if (!snapshot.exists() || snapshot.data().userId !== userId) {
    throw new Error("Notification not found or access denied.");
  }

  return notificationRef;
}

export async function markNotificationRead(
  userId,
  notificationId
) {
  const notificationRef = await getOwnedNotification(
    userId,
    notificationId
  );

  await updateDoc(notificationRef, {
    read: true
  });
}

export async function markAllNotificationsRead(userId) {
  const notifications = await getNotifications(userId);

  const unread = notifications.filter((item) => !item.read);

  await Promise.all(
    unread.map((item) =>
      markNotificationRead(userId, item.id)
    )
  );
}

export async function deleteNotification(
  userId,
  notificationId
) {
  const notificationRef = await getOwnedNotification(
    userId,
    notificationId
  );

  await deleteDoc(notificationRef);
}
