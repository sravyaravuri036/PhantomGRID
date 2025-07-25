import React from "react";
import { useLiveLogs } from "./listner";

function HoneypotLogs() {
  const logs = useLiveLogs();

  return (
    <div className="bg-[#0f172a] text-white px-10 py-8 w-full min-h-screen">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        📡 Honeypot Logs
      </h2>

      {logs.length === 0 ? (
        <p className="text-gray-400">No logs found.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow ring-1 ring-white/10">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-[#1e293b] text-gray-300 text-left">
              <tr>
                <th className="px-5 py-4">Endpoint</th>
                <th className="px-5 py-4">Method</th>
                <th className="px-5 py-4">IP</th>
                <th className="px-5 py-4">Tag</th>
                <th className="px-5 py-4">Session ID</th>
                <th className="px-5 py-4">Timestamp</th>
                <th className="px-5 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="bg-[#0f172a] divide-y divide-gray-700">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-[#1e293b] transition-all duration-150"
                >
                  <td className="px-5 py-4 break-words max-w-[150px]">{log.endpoint || "-"}</td>
                  <td className="px-5 py-4">{log.method || "-"}</td>
                  <td className="px-5 py-4">{log.ip || "-"}</td>
                  <td className="px-5 py-4 break-words max-w-[120px]">{log.tag || "-"}</td>
                  <td className="px-5 py-4 font-mono break-all max-w-[250px]">{log.session_id || "-"}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    {log.timestamp?.toDate().toLocaleString() || "-"}
                  </td>
                  <td className="px-5 py-4 max-w-[300px]">
                    <details className="cursor-pointer text-blue-400">
                      <summary className="hover:underline">View</summary>
                      <pre className="text-xs text-gray-300 mt-2 bg-[#1e293b] p-3 rounded overflow-auto max-h-48 whitespace-pre-wrap">
                        {JSON.stringify(
                          {
                            headers: log.headers,
                            cookies: log.cookies,
                            form_data: log.form_data,
                          },
                          null,
                          2
                        )}
                      </pre>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HoneypotLogs;
