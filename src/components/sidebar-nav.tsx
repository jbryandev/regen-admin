import NavigationLink from "@/components/navigation-link";
import { leaderMenu, directorMenu, coachMenu, techMenu } from "@/lib/config";
import { type NavigationMenuItem, type NavigationMenu } from "@/lib/types";

const SidebarNav = (menu: NavigationMenu) => {
  const navigation = Array<NavigationMenuItem>();

  switch (menu.variant) {
    case "leader":
      if (!menu.groupId)
        throw new Error("Error getting group id for leader menu");
      navigation.push(...leaderMenu(menu.groupId));
      break;
    case "coach":
      navigation.push(...coachMenu);
      break;
    case "tech":
      navigation.push(...techMenu);
      break;
    default:
      navigation.push(...directorMenu);
      break;
  }

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navigation.map((item) => {
        return (
          <NavigationLink key={item.title} href={item.path} title={item.title}>
            <item.icon className="h-4 w-4" />
            {item.title}
          </NavigationLink>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
