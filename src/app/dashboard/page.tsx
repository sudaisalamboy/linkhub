"use client";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newIcon, setNewIcon] = useState("🔗");

  useEffect(() => {
    fetch("/api/stats").then((r) => r.json()).then(setStats).catch(() => {});
    fetch("/api/links").then((r) => r.json()).then(setProfile).catch(() => {});
  }, []);

  const addLink = async () => {
    if (!newTitle || !newUrl) return;
    await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, url: newUrl, icon: newIcon }),
    });
    setNewTitle(""); setNewUrl(""); setNewIcon("🔗");
    fetch("/api/links").then((r) => r.json()).then(setProfile);
    fetch("/api/stats").then((r) => r.json()).then(setStats);
  };

  const removeLink = async (id: string) => {
    await fetch(`/api/links?id=${id}`, { method: "DELETE" });
    fetch("/api/links").then((r) => r.json()).then(setProfile);
    fetch("/api/stats").then((r) => r.json()).then(setStats);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e2e8f0", padding: "40px 20px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg, #7c3aed, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Dashboard</h1>
        <p style={{ color: "#94a3b8", marginBottom: 32 }}>Manage your LinkHub profile</p>

        {/* Stats Grid */}
        {stats && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
            {[
              { label: "Total Views", value: stats.views, icon: "👁️", color: "#3b82f6" },
              { label: "Total Clicks", value: stats.totalClicks, icon: "👆", color: "#10b981" },
              { label: "Links", value: stats.totalLinks, icon: "🔗", color: "#f59e0b" },
              { label: "CTR", value: stats.ctr, icon: "📊", color: "#ec4899" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#16161e", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 700 }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Add Link Form */}
        <div style={{ background: "#16161e", borderRadius: 16, padding: 24, marginBottom: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 16 }}>➕ Add New Link</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <input value={newIcon} onChange={(e) => setNewIcon(e.target.value)} placeholder="Icon" style={{ flex: "0 0 60px", padding: "12px", background: "#0a0a0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#e2e8f0", textAlign: "center", fontSize: "1.2rem" }} />
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Link title" style={{ flex: "1 1 200px", padding: "12px 16px", background: "#0a0a0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#e2e8f0", fontSize: "0.9rem" }} />
            <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://..." style={{ flex: "1 1 300px", padding: "12px 16px", background: "#0a0a0f", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#e2e8f0", fontSize: "0.9rem" }} />
            <button onClick={addLink} style={{ padding: "12px 24px", background: "linear-gradient(135deg, #7c3aed, #6366f1)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}>Add</button>
          </div>
        </div>

        {/* Links List */}
        <div style={{ background: "#16161e", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 16 }}>📋 Your Links</h2>
          {profile && profile.map((link: any) => (
            <div key={link.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: "1.3rem" }}>{link.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: "0.95rem" }}>{link.title}</div>
                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{link.url}</div>
              </div>
              <span style={{ fontSize: "0.75rem", color: "#10b981", background: "rgba(16,185,129,0.1)", padding: "4px 10px", borderRadius: 6 }}>{link.clicks} clicks</span>
              <button onClick={() => removeLink(link.id)} style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: "0.8rem" }}>Delete</button>
            </div>
          ))}
        </div>

        {/* View Profile Button */}
        <a href="/sudais" style={{ display: "block", textAlign: "center", marginTop: 24, padding: "14px", background: "#16161e", borderRadius: 12, color: "#a78bfa", fontWeight: 600, border: "1px solid rgba(167,139,250,0.3)" }}>👁️ View Public Profile</a>
      </div>
    </div>
  );
}
