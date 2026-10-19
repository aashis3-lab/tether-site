// The fictional group every mockup shares, so the story reads the same section to section.
export type Person = {
  name: string;
  initial: string;
  /** Avatar gradient, like the app's initials avatars. */
  from: string;
  to: string;
};

export const maya: Person = { name: "Maya", initial: "M", from: "#ff4f8b", to: "#ff8a3d" };
export const jake: Person = { name: "Jake", initial: "J", from: "#7c5cff", to: "#b38bff" };
export const priya: Person = { name: "Priya", initial: "P", from: "#0f9f8f", to: "#4fd1c5" };
export const sam: Person = { name: "Sam", initial: "S", from: "#e08a00", to: "#f7c04a" };
export const ava: Person = { name: "Ava", initial: "A", from: "#1e88e5", to: "#64b5f6" };

export const group = [maya, jake, priya, sam, ava];

export const PARTY = { name: "Birthday crawl", venue: "Park Bar", ends: "2:00 AM" };
