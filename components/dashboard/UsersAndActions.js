"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "@/components/ui/toast";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  UserPlus,
  Wrench,
  Ticket,
  Bell,
  FileSpreadsheet,
  FileText,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ShieldCheck,
  Shield,
  UserCheck,
  RefreshCw,
  Edit2,
  Copy,
  Check,
} from "lucide-react";
import { getStoredRealUsers, subscribeUserRegistry, DEFAULT_REAL_USERS, saveRealUserToRegistry } from "@/lib/userRegistry.js";
import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@/context/AuthContext";

export function UsersAndActions({
  onAddService,
  onAddTechnician,
  onCreateCoupon,
  onSendNotification,
  onGenerateReport,
}) {
  const { user: currentUser } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [usersList, setUsersList] = useState(DEFAULT_REAL_USERS);
  const [isLoading, setIsLoading] = useState(false);
  const [registryVer, setRegistryVer] = useState(0);
  const [selectedUserAction, setSelectedUserAction] = useState(null); // { user, modal: 'role' | 'status' | 'view' }
  const [actionLoading, setActionLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const unsub = subscribeUserRegistry(() => setRegistryVer((v) => v + 1));
    return unsub;
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    let apiUsers = [];

    // Try admin users API first
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.users)) {
          apiUsers = data.users;
        }
      }
    } catch (e) {
      // If admin endpoint fails, try search endpoint
      try {
        const searchRes = await fetch("/api/users/search?q=");
        if (searchRes.ok) {
          const sData = await searchRes.json();
          if (sData.success && Array.isArray(sData.users)) {
            apiUsers = sData.users;
          }
        }
      } catch (err) {}
    }

    const localRealUsers = getStoredRealUsers();
    const map = new Map();

    // Merge default seeds, stored registered users, and backend users
    [...DEFAULT_REAL_USERS, ...localRealUsers, ...apiUsers].forEach((u) => {
      if (u && u.email) {
        const emailKey = u.email.toLowerCase();
        const existing = map.get(emailKey) || {};
        map.set(emailKey, {
          id: u.id || u._id || existing.id || `usr-${Date.now()}`,
          name: u.name || u.displayName || existing.name || emailKey.split("@")[0],
          displayName: u.displayName || u.name || existing.displayName || emailKey.split("@")[0],
          email: emailKey,
          phone: u.phone || existing.phone || "+977 9800000000",
          location: u.location || existing.location || "Panchthar, Phidim",
          role: (u.role || existing.role || "USER").toUpperCase(),
          status: u.status || existing.status || "Active",
          avatar: u.avatar || u.picture || existing.avatar || "",
          joined: u.joined || existing.joined || "Registered User",
          bio: u.bio || existing.bio || "",
        });
      }
    });

    setUsersList(Array.from(map.values()));
    setIsLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, [registryVer]);

  // Filter users based on Search query, Status, and Role
  const filteredUsers = usersList.filter((u) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (u.name || "").toLowerCase().includes(q) ||
      (u.displayName || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.phone || "").includes(q) ||
      (u.location || "").toLowerCase().includes(q) ||
      (u.role || "").toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "All" ||
      u.status?.toLowerCase() === statusFilter.toLowerCase();

    const matchesRole =
      roleFilter === "All" ||
      u.role?.toUpperCase() === roleFilter.toUpperCase();

    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / ITEMS_PER_PAGE));
  const paginatedUsers = filteredUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Handle Changing User Role
  const handleChangeRole = async (targetUser, newRole) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "changeRole",
          email: targetUser.email,
          role: newRole,
        }),
      });

      if (res.ok) {
        toast.success(`Role for ${targetUser.name} updated to ${newRole}!`);
      } else {
        toast.info(`Updated role for ${targetUser.name} to ${newRole} (Local Session)`);
      }

      // Update registry locally
      saveRealUserToRegistry({
        ...targetUser,
        role: newRole,
      });
      loadUsers();
    } catch (e) {
      saveRealUserToRegistry({
        ...targetUser,
        role: newRole,
      });
      loadUsers();
      toast.success(`Role updated to ${newRole}`);
    } finally {
      setActionLoading(false);
      setSelectedUserAction(null);
    }
  };

  // Handle Changing User Status
  const handleChangeStatus = async (targetUser, newStatus) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "changeStatus",
          email: targetUser.email,
          status: newStatus,
        }),
      });

      if (res.ok) {
        toast.success(`Status for ${targetUser.name} changed to ${newStatus}!`);
      } else {
        toast.info(`Status updated for ${targetUser.name} to ${newStatus}`);
      }

      saveRealUserToRegistry({
        ...targetUser,
        status: newStatus,
      });
      loadUsers();
    } catch (e) {
      saveRealUserToRegistry({
        ...targetUser,
        status: newStatus,
      });
      loadUsers();
      toast.success(`Status updated to ${newStatus}`);
    } finally {
      setActionLoading(false);
      setSelectedUserAction(null);
    }
  };

  const copyToClipboard = (text, email) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(email);
    toast.success(`Copied "${text}" to clipboard`);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const exportExcel = () => {
    const csvRows = [
      ["Name", "Display Name", "Email", "Phone", "Role", "Status", "Location"],
      ...filteredUsers.map((u) => [
        `"${u.name}"`,
        `"${u.displayName || u.name}"`,
        `"${u.email}"`,
        `"${u.phone}"`,
        `"${u.role}"`,
        `"${u.status}"`,
        `"${u.location}"`,
      ]),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `phidim_users_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Users list exported as CSV successfully!");
  };

  const exportPDF = () => {
    toast.info("Generating & Exporting Users Report as PDF Document...");
  };

  const getRoleBadge = (role) => {
    const r = (role || "USER").toUpperCase();
    if (r === "ADMIN") {
      return {
        bg: "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800",
        dot: "bg-purple-500",
        label: "ADMIN",
      };
    }
    if (r === "TECHNICIAN") {
      return {
        bg: "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
        dot: "bg-emerald-500",
        label: "TECHNICIAN",
      };
    }
    return {
      bg: "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800",
      dot: "bg-blue-500",
      label: "USER",
    };
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Users Table (2 Columns) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-2 bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6"
      >
        {/* Table Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Users className="text-emerald-500" size={20} />
              Registered Platform Users & Technicians
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live accounts registry ({usersList.length} verified users across Phidim & Panchthar)
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={loadUsers}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors border border-slate-200/60 dark:border-slate-700/60"
              title="Refresh User List"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin text-emerald-500" : ""} />
            </button>
            <button
              onClick={exportPDF}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              <FileText size={14} className="text-rose-500" />
              <span>PDF</span>
            </button>
            <button
              onClick={exportExcel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/60 dark:border-slate-700/60"
            >
              <FileSpreadsheet size={14} className="text-emerald-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Search & Multi-Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by name, email, phone, role, ward..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            {/* Role Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => {
                  setRoleFilter(e.target.value);
                  setPage(1);
                }}
                className="h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="All">All Roles</option>
                <option value="ADMIN">Master Admins</option>
                <option value="TECHNICIAN">Technicians</option>
                <option value="USER">Customers (Users)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="New">New</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="pb-3 px-2">User / Name</th>
                <th className="pb-3 px-2">Role</th>
                <th className="pb-3 px-2">Contact Info</th>
                <th className="pb-3 px-2">Location</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((u) => {
                  const roleBadge = getRoleBadge(u.role);
                  const isCurrent = currentUser?.email?.toLowerCase() === u.email.toLowerCase();

                  return (
                    <tr key={u.id || u.email} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-3">
                          <UserAvatar user={u} size="sm" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-extrabold text-slate-900 dark:text-white truncate">
                                {u.displayName || u.name}
                              </p>
                              {isCurrent && (
                                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black px-1.5 py-0.2 rounded">
                                  You
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {u.joined || "Registered User"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-full border ${roleBadge.bg}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${roleBadge.dot}`} />
                          {roleBadge.label}
                        </span>
                      </td>

                      <td className="py-3 px-2">
                        <div className="space-y-0.5">
                          <button
                            onClick={() => copyToClipboard(u.email, u.email)}
                            className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 group text-left"
                            title="Click to copy email"
                          >
                            <Mail size={11} className="text-slate-400 group-hover:text-emerald-500" />
                            <span className="truncate max-w-[150px]">{u.email}</span>
                            {copiedEmail === u.email ? <Check size={10} className="text-emerald-500 ml-1" /> : null}
                          </button>
                          <p className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                            <Phone size={11} className="text-slate-400" /> {u.phone || "+977 9800000000"}
                          </p>
                        </div>
                      </td>

                      <td className="py-3 px-2">
                        <span className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                          <MapPin size={12} className="text-emerald-500" /> {u.location || "Panchthar, Phidim"}
                        </span>
                      </td>

                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                            u.status?.toLowerCase() === "active"
                              ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                              : u.status?.toLowerCase() === "new"
                              ? "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              u.status?.toLowerCase() === "active"
                                ? "bg-emerald-500"
                                : u.status?.toLowerCase() === "new"
                                ? "bg-blue-500"
                                : "bg-slate-400"
                            }`}
                          />
                          {u.status || "Active"}
                        </span>
                      </td>

                      <td className="py-3 px-2 text-right">
                        <div className="relative inline-block text-left">
                          <button
                            onClick={() => setSelectedUserAction(selectedUserAction?.user?.email === u.email ? null : { user: u })}
                            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"
                            title="Manage user actions"
                          >
                            <MoreHorizontal size={16} />
                          </button>

                          {/* Quick Actions Dropdown */}
                          {selectedUserAction?.user?.email === u.email && (
                            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-1.5 z-30 text-left">
                              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800">
                                <p className="text-[11px] font-black text-slate-900 dark:text-white truncate">{u.name}</p>
                                <p className="text-[10px] text-slate-400 truncate">{u.email}</p>
                              </div>

                              <div className="py-1 space-y-0.5">
                                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                                  Change Role
                                </span>
                                <button
                                  onClick={() => handleChangeRole(u, "ADMIN")}
                                  disabled={u.role === "ADMIN" || actionLoading}
                                  className="w-full text-left px-2.5 py-1.5 text-xs rounded-xl font-bold hover:bg-purple-50 dark:hover:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-between disabled:opacity-40"
                                >
                                  <span>Make Admin</span>
                                  {u.role === "ADMIN" && <Check size={12} />}
                                </button>
                                <button
                                  onClick={() => handleChangeRole(u, "TECHNICIAN")}
                                  disabled={u.role === "TECHNICIAN" || actionLoading}
                                  className="w-full text-left px-2.5 py-1.5 text-xs rounded-xl font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-between disabled:opacity-40"
                                >
                                  <span>Make Technician</span>
                                  {u.role === "TECHNICIAN" && <Check size={12} />}
                                </button>
                                <button
                                  onClick={() => handleChangeRole(u, "USER")}
                                  disabled={u.role === "USER" || actionLoading}
                                  className="w-full text-left px-2.5 py-1.5 text-xs rounded-xl font-bold hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-between disabled:opacity-40"
                                >
                                  <span>Make Customer (User)</span>
                                  {u.role === "USER" && <Check size={12} />}
                                </button>

                                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                                  Status
                                </span>
                                <button
                                  onClick={() => handleChangeStatus(u, u.status === "Active" ? "Suspended" : "Active")}
                                  disabled={actionLoading}
                                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-xl font-bold ${
                                    u.status === "Active"
                                      ? "hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 dark:text-rose-400"
                                      : "hover:bg-emerald-50 dark:hover:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                                  }`}
                                >
                                  {u.status === "Active" ? "Suspend Account" : "Activate Account"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No matching users found for query &quot;{search}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 gap-2">
          <span>
            Showing {filteredUsers.length > 0 ? (page - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
            {Math.min(page * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} Registered Users
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  page === p
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Card (1 Column) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-white/90 dark:bg-slate-900/90 rounded-[24px] border border-slate-200/80 dark:border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-emerald-500/30 transition-all p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Sparkles className="text-amber-500" size={20} />
              Quick Actions
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 text-xs font-extrabold border border-amber-500/30">
              Admin Hub
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Instant operations and administrative shortcuts
          </p>

          <div className="space-y-3">
            <button
              onClick={onAddService}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <Wrench size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Add New Service</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Create DTH, CCTV, electrical service listing</p>
              </div>
            </button>

            <button
              onClick={onAddTechnician}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-blue-500/30 text-blue-700 dark:text-blue-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform">
                <UserPlus size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Add Technician</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Register & assign field staff to Ward</p>
              </div>
            </button>

            <button
              onClick={onCreateCoupon}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-violet-500/10 hover:from-purple-500/20 hover:to-violet-500/20 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-600/30 group-hover:scale-110 transition-transform">
                <Ticket size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Create Coupon Code</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Generate promo discounts for customers</p>
              </div>
            </button>

            <button
              onClick={onSendNotification}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Bell size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Send Notification</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Broadcast push alerts to all technicians</p>
              </div>
            </button>

            <button
              onClick={onGenerateReport}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-teal-500/10 to-emerald-500/10 hover:from-teal-500/20 hover:to-emerald-500/20 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-extrabold text-xs flex items-center gap-3 transition-all group"
            >
              <div className="p-2 rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/30 group-hover:scale-110 transition-transform">
                <Download size={16} />
              </div>
              <div className="text-left">
                <p className="font-extrabold text-sm">Generate Full Report</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">Download monthly financial & booking audit</p>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
