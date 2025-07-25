// src/hooks/useLiveLogs.js
import { useEffect, useState } from "react";
import { db } from "./firebase"; // 🔁 adjust path
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const useLiveLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "honeypot_logs"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Honeypot Logs:", logsData); // ✅ Debugging output
      setLogs(logsData);
    });

    return () => unsubscribe();
  }, []);

  return logs;
};
