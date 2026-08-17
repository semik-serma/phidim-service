"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SERVICE_REQUEST_STATUSES } from "@/lib/requests";
import { useCall } from "@/components/calls/CallProvider";
import { PhoneCall } from "lucide-react";

/**
 * Client rendering for the /requests page. All data comes from the
 * server component (already role-scoped). Mutations talk to protected
 * APIs that re-assert the session + role server-side, so a crafted
 * client can never read or write someone else's requests.
 */
export default function RequestsPage({ requests, userRole }) {
  const router = useRouter();
  const { startCall } = useCall();
  const [items, setItems] = useState(requests);
  const [form, setForm] = useState({ title: "", category: "", description: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const canCreate = userRole === "USER" || userRole === "ADMIN";
  const canUpdateStatus = userRole === "TECHNICIAN" || userRole === "ADMIN";

  const listEndpoint = userRole === "TECHNICIAN" ? "/api/technician/jobs" : "/api/user/requests";

  async function refresh() {
    try {
      const res = await fetch(listEndpoint);
      if (res.ok) {
        const data = await res.json();
        setItems(data.requests || data.jobs || []);
      }
    } catch {
      // ignore; server refresh below will surface errors
    }
    router.refresh();
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/user/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to create request.");
        return;
      }
      setForm({ title: "", category: "", description: "", phone: "" });
      setMessage("Service request created.");
    } finally {
      setBusy(false);
      await refresh();
    }
  }

  async function handleStatusChange(requestId, status) {
    setBusy(true);
    setMessage("");
    try {
      const res = await fetch("/api/technician/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status }),
      });
      const data = await res.json();
      setMessage(res.ok ? data.message || "Status updated." : data.error || "Update failed.");
    } finally {
      setBusy(false);
      await refresh();
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 sm:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Service Requests</h1>
          <p className="text-sm text-slate-500">
            Role: <strong>{userRole}</strong>. Data shown here is scoped by your role — you can
            never see another user&apos;s requests, or a technician&apos;s private job list.
          </p>
        </div>

        {message && (
          <div className="p-3 rounded-xl text-sm font-bold bg-emerald-50 border border-emerald-200 text-emerald-800">
            {message}
          </div>
        )}

        {canCreate && (
          <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
            <h2 className="font-bold text-sm text-slate-800 uppercase tracking-wide">New Service Request</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Title (e.g. Split AC gas refill)"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Category (e.g. AC, CCTV, Electrical)"
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe the issue..."
              rows={2}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm w-full"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Contact phone"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={busy}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold disabled:opacity-60"
            >
              Submit Request
            </button>
          </form>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Call</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                    No requests found for your account.
                  </td>
                </tr>
              )}
              {items.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{r.id}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    {r.title}
                    <div className="text-xs font-normal text-slate-400">{r.category}</div>
                  </td>
                  <td className="px-4 py-3">
                    {canUpdateStatus ? (
                      <select
                        value={r.status}
                        onChange={(e) => handleStatusChange(r.id, e.target.value)}
                        disabled={busy}
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                      >
                        {SERVICE_REQUEST_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                        {r.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-3">
                    {userRole === "USER" ? (
                      r.technicianEmail ? (
                        <button
                          onClick={() =>
                            startCall(
                              {
                                name: r.technicianEmail.split("@")[0] || "Technician",
                                email: r.technicianEmail,
                                role: "TECHNICIAN",
                                phone: "+977 9862772457",
                              },
                              "voice"
                            )
                          }
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center gap-1 text-xs font-bold transition-all hover:scale-102 cursor-pointer"
                          title={`Call Technician (${r.technicianEmail})`}
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                          <span>Call Tech</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 font-semibold italic">Unassigned</span>
                      )
                    ) : userRole === "TECHNICIAN" ? (
                      r.userEmail ? (
                        <button
                          onClick={() =>
                            startCall(
                              {
                                name: r.userEmail.split("@")[0] || "Customer",
                                email: r.userEmail,
                                role: "USER",
                                phone: r.phone || "",
                              },
                              "voice"
                            )
                          }
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 flex items-center gap-1 text-xs font-bold transition-all hover:scale-102 cursor-pointer"
                          title={`Call Customer (${r.userEmail})`}
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                          <span>Call Customer</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400 font-semibold italic">No Contact</span>
                      )
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-bold text-slate-500">
                        {r.technicianEmail && (
                          <button
                            onClick={() =>
                              startCall(
                                {
                                  name: r.technicianEmail.split("@")[0] || "Technician",
                                  email: r.technicianEmail,
                                  role: "TECHNICIAN",
                                  phone: "+977 9862772457",
                                },
                                "voice"
                              )
                            }
                            className="p-1 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-pointer"
                            title="Call Tech"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {r.userEmail && (
                          <button
                            onClick={() =>
                              startCall(
                                {
                                  name: r.userEmail.split("@")[0] || "Customer",
                                  email: r.userEmail,
                                  role: "USER",
                                  phone: r.phone || "",
                                },
                                "voice"
                              )
                            }
                            className="p-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 cursor-pointer"
                            title="Call Customer"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}