import {
  Home,
  User,
  Users,
  Video,
  Mail,
  CalendarDays,
  Music,
  Star,
  HeartHandshake,
  ListChecks,
  UserCheck,
  Award,
} from "lucide-react";

export const siteConfig = {
  title: "Regen Admin",
  description: "Regen Admin",
  image: "/ReGen_Icon_Primary.png",
};

export const defaultMenu = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
];

export const leaderMenu = (groupId: string) => {
  return [
    ...defaultMenu,
    {
      title: "Group",
      icon: Users,
      path: `/groups/${groupId}`,
    },
    {
      title: "Attendance",
      icon: UserCheck,
      path: `/groups/${groupId}/attendance`,
    },
    {
      title: "Training",
      icon: Video,
      path: `/groups/${groupId}/training`,
    },
    {
      title: "Tasks",
      icon: ListChecks,
      path: `/groups/${groupId}/tasks`,
    },
    {
      title: "Communications",
      icon: Mail,
      path: `/groups/${groupId}/communications`,
    },
    {
      title: "Schedule",
      icon: CalendarDays,
      path: `/groups/${groupId}/schedule`,
    },
  ];
};

export const coachMenu = [
  ...defaultMenu,
  {
    title: "Groups",
    icon: Users,
    path: "/groups",
  },
  {
    title: "Participants",
    icon: User,
    path: "/participants",
  },
  {
    title: "Leaders",
    icon: Star,
    path: "/leaders",
  },
  {
    title: "Mentors",
    icon: HeartHandshake,
    path: "/mentors",
  },
];

export const directorMenu = [
  ...coachMenu,
  {
    title: "Coaches",
    icon: Award,
    path: "/coaches",
  },
  {
    title: "Worship",
    icon: Music,
    path: "/worship",
  },
];

export const techMenu = [
  ...defaultMenu,
  {
    title: "Worship",
    icon: Music,
    path: "/worship",
  },
];
