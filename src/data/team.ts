// Cofounders shown on /about, in display order.
// Optional fields stay hidden until filled in:
//   role:     e.g. "CEO"
//   bio:      one line
//   photo:    a square image in /public/team, e.g. "/team/maera.jpg" (initials show until then)
//   linkedin: full profile URL
export type TeamMember = {
  name: string;
  role?: string;
  bio?: string;
  photo?: string;
  linkedin?: string;
};

export const team: TeamMember[] = [{ name: "Maera" }, { name: "Jessica" }, { name: "Aashi" }, { name: "Carina" }];
