
"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

import app from "../../../backend/firebase/firebase";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification
} from "../../../backend/database/notifications";

const auth = getAuth(app);

export default function Notifications() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  async function loadNotifications(uid) {
    setLoading(true);
    setError("");

    try {
      const data = await getNotifications(uid);
      setNotifications(data);
    } catch (err) {
      console.error(err);
      setError("Could not load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        loadNotifications(currentUser.uid);
      } else {
        setNotifications([]);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  async function markRead(notificationId) {
    if (!user) return;

    try {
      await markNotificationRead(user.uid, notificationId);

      setNotifications((current) =>
        current.map((item) =>
          item.id === notificationId
            ? { ...item, read: true }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      setError("Could not update this notification.");
    }
  }

  async function markAllRead() {
    if (!user) return;

    try {
      await markAllNotificationsRead(user.uid);

      setNotifications((current) =>
        current.map((item) => ({ ...item, read: true }))
      );
    } catch (err) {
      console.error(err);
      setError("Could not mark notifications as read.");
    }
  }

  async function removeNotification(notificationId) {
    if (!user) return;

    try {
      await deleteNotification(user.uid, notificationId);

      setNotifications((current) =>
        current.filter((item) => item.id !== notificationId)
      );
    } catch (err) {
      console.error(err);
      setError("Could not delete this notification.");
    }
  }

  function formatDate(value) {
    if (!value) return "Date unavailable";

    const date = value?.toDate
      ? value.toDate()
      : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Date unavailable";
    }

    return date.toLocaleString();
  }

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const visibleNotifications = notifications.filter((item) => {
    if (filter === "unread") return !item.read;
    if (filter === "read") return item.read;
    return true;
  });

  return (
    <main>
      <Navbar />

      <section>
        <h1>KuroKage Notifications</h1>
        <p>Your orders, rewards, and account updates in one place.</p>

        {!user ? (
          <p>Please log in to view your notifications.</p>
        ) : (
          <>
            <h2>Unread: {unreadCount}</h2>

            <button
              onClick={markAllRead}
              disabled={unreadCount === 0 || loading}
            >
              Mark All as Read
            </button>

            <button
              onClick={() => loadNotifications(user.uid)}
              disabled={loading}
            >
              Refresh
            </button>

            <div>
              <label htmlFor="notification-filter">
                Show:
              </label>{" "}
              <select
                id="notification-filter"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              >
                <option value="all">All notifications</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>

            {error && <p role="alert">{error}</p>}

            {loading ? (
              <p>Loading notifications...</p>
            ) : visibleNotifications.length === 0 ? (
              <p>No notifications here yet.</p>
            ) : (
              visibleNotifications.map((item) => (
                <article key={item.id}>
                  <h3>
                    {!item.read && "● "}
                    {item.title || "KuroKage Update"}
                  </h3>

                  <p>{item.message || "You have a new update."}</p>

                  <p>
                    <strong>Type:</strong>{" "}
                    {item.type || "general"}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {formatDate(item.createdAt)}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {item.read ? "Read" : "Unread"}
                  </p>

                  {!item.read && (
                    <button onClick={() => markRead(item.id)}>
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => removeNotification(item.id)}
                  >
                    Delete
                  </button>

                  <hr />
                </article>
              ))
            )}
          </>
        )}
      </section>
    </main>
  );
             }
               
