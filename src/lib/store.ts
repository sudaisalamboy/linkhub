/**
 * In-memory data store for LinkHub.
 * In production, replace with a real database (Prisma + PostgreSQL/SQLite).
 */

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  clicks: number;
  order: number;
}

export interface Profile {
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  theme: "dark" | "light" | "sunset" | "ocean";
  links: LinkItem[];
  views: number;
}

// Default demo profile
const demoProfile: Profile = {
  username: "sudais",
  displayName: "Sudais Alam",
  bio: "Full Stack Developer | Web3 Enthusiast\nBuilding cool things with code 🚀",
  avatar: "",
  theme: "dark",
  views: 1247,
  links: [
    { id: "1", title: "GitHub", url: "https://github.com/sudaisalamboy", icon: "🐙", clicks: 342, order: 0 },
    { id: "2", title: "Weather App", url: "https://github.com/sudaisalamboy/weather-app", icon: "🌤️", clicks: 218, order: 1 },
    { id: "3", title: "Portfolio Website", url: "#", icon: "🌐", clicks: 156, order: 2 },
    { id: "4", title: "Contact Me", url: "mailto:sudaisalam@gmail.com", icon: "📧", clicks: 89, order: 3 },
    { id: "5", title: "LinkedIn", url: "#", icon: "💼", clicks: 67, order: 4 },
  ],
};

// Simulate a database with in-memory store
let profile: Profile = { ...demoProfile };

export function getProfile(): Profile {
  return profile;
}

export function getProfileByUsername(username: string): Profile | null {
  if (username.toLowerCase() === profile.username.toLowerCase()) return profile;
  return null;
}

export function incrementView(username: string): void {
  if (username.toLowerCase() === profile.username.toLowerCase()) {
    profile.views++;
  }
}

export function incrementClick(linkId: string): void {
  const link = profile.links.find((l) => l.id === linkId);
  if (link) link.clicks++;
}

export function updateProfile(updates: Partial<Profile>): Profile {
  profile = { ...profile, ...updates };
  return profile;
}

export function addLink(title: string, url: string, icon?: string): LinkItem {
  const link: LinkItem = {
    id: Date.now().toString(),
    title,
    url,
    icon: icon || "🔗",
    clicks: 0,
    order: profile.links.length,
  };
  profile.links.push(link);
  return link;
}

export function removeLink(linkId: string): void {
  profile.links = profile.links.filter((l) => l.id !== linkId);
}

export function getStats() {
  const totalClicks = profile.links.reduce((sum, l) => sum + l.clicks, 0);
  const totalLinks = profile.links.length;
  const ctr = profile.views > 0 ? ((totalClicks / profile.views) * 100).toFixed(1) : "0";
  return {
    views: profile.views,
    totalClicks,
    totalLinks,
    ctr: `${ctr}%`,
    topLink: profile.links.sort((a, b) => b.clicks - a.clicks)[0] || null,
  };
}
