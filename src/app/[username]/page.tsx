"use client";
import { useState, useEffect } from "react";

interface LinkItem {
  id: string; title: string; url: string; icon: string; clicks: number; order: number;
}
interface Profile {
  username: string; displayName: string; bio: string; avatar: string;
  theme: string; links: LinkItem[]; views: number;
}

const THEMES = {
  dark:   { bg: "#0a0a0f", card: "#16161e", accent: "#7c3aed", text: "#e2e8f0", dim: "#94a3b8" },
  light:  { bg: "#f8fafc", card: "#ffffff", accent: "#7c3aed", text: "#1e293b", dim: "#64748b" },
  sunset: { bg: "#1a0a2e", card: "#2d1b4e", accent: "#ec4899", text: "#fce7f3", dim: "#c4b5fd" },
  ocean:  { bg: "#0c1929", card: "#1a3a5c", accent: "#06b6d4", text: "#e0f2fe", dim: "#7dd3fc" },
};

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    params.then(({ username }) => {
      fetch(`/api/profile/${username}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data) setProfile(data);
          else setError("Profile not found");
          setLoading(false);
        })
        .catch(() => { setError("Failed to load"); setLoading(false); });
    });
  }, [params]);

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <div style={{ width: 40, height: 40, border: "3px solid #333", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  if (error)
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: 12 }}>
        <h1 style={{ fontSize: "2rem" }}>😕</h1>
        <p style={{ color: "#94a3b8" }}>{error}</p>
        <a href="/" style={{ color: "#7c3aed", textDecoration: "underline" }}>Go home</a>
      </div>
    );

  if (!profile) return null;
  const theme = THEMES[profile.theme as keyof typeof THEMES] || THEMES.dark;

  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text, padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Avatar */}
      <div style={{ marginTop: 40, marginBottom: 16 }}>
        {profile.avatar ? (
          <img src={profile.avatar} alt={profile.displayName} style={{ width: 96, height: 96, borderRadius: "50%", border: `3px solid ${theme.accent}`, objectFit: "cover" }} />
        ) : (
          <div style={{ width: 96, height: 96, borderRadius: "50%", background: `linear-gradient(135deg, ${theme.accent}, ${theme.card})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", fontWeight: 700, border: `3px solid ${theme.accent}` }}>
            {profile.displayName.charAt(0)}
          </div>
        )}
      </div>

      {/* Name + Bio */}
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 4 }}>{profile.displayName}</h1>
      <p style={{ color: theme.dim, fontSize: "0.9rem", textAlign: "center", whiteSpace: "pre-line", marginBottom: 4 }}>@{profile.username}</p>
      <p style={{ color: theme.dim, fontSize: "0.9rem", textAlign: "center", whiteSpace: "pre-line", marginBottom: 24, maxWidth: 400 }}>{profile.bio}</p>

      {/* Links */}
      <div style={{ width: "100%", maxWidth: 440, display: "flex", flexDirection: "column", gap: 12 }}>
        {profile.links.sort((a, b) => a.order - b.order).map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "16px 20px",
              background: theme.card,
              borderRadius: 14,
              border: `1px solid ${theme.accent}22`,
              transition: "all 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${theme.accent}33`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <span style={{ fontSize: "1.5rem" }}>{link.icon}</span>
            <span style={{ flex: 1, fontWeight: 500, fontSize: "1rem" }}>{link.title}</span>
            <span style={{ fontSize: "0.75rem", color: theme.dim }}>{link.clicks > 0 && `${link.clicks} clicks`}</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p style={{ marginTop: 32, fontSize: "0.8rem", color: theme.dim, opacity: 0.6 }}>
        Made with <span style={{ color: theme.accent }}>LinkHub</span> · {profile.views} views
      </p>
    </div>
  );
}
