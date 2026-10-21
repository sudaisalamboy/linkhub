"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e2e8f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      {/* Hero */}
      <div style={{ textAlign: "center", maxWidth: 600 }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔗</div>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: 12, background: "linear-gradient(135deg, #7c3aed, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LinkHub</h1>
        <p style={{ fontSize: "1.1rem", color: "#94a3b8", marginBottom: 8 }}>Your link in bio — beautiful, fast, with analytics.</p>
        <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: 32 }}>Built with Next.js 16 · Made by Sudais Alam</p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" style={{ padding: "14px 32px", background: "linear-gradient(135deg, #7c3aed, #6366f1)", color: "#fff", borderRadius: 12, fontWeight: 600, fontSize: "1rem" }}>Dashboard →</Link>
          <Link href="/sudais" style={{ padding: "14px 32px", background: "#16161e", color: "#e2e8f0", borderRadius: 12, fontWeight: 600, fontSize: "1rem", border: "1px solid rgba(255,255,255,0.1)" }}>View Demo Profile</Link>
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 48 }}>
          {[
            { icon: "📊", title: "Analytics", desc: "Track views & clicks" },
            { icon: "🎨", title: "Themes", desc: "4 beautiful themes" },
            { icon: "⚡", title: "Fast", desc: "Next.js 16 powered" },
          ].map((f) => (
            <div key={f.title} style={{ background: "#16161e", borderRadius: 14, padding: 20, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
