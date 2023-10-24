import Auth from "../pages/Auth";
import {RoutesInt} from "../types/RoutesInt";
import Settings from "../pages/Settings";
import Bookmarks from "../pages/Bookmarks";
import Contacts from "../pages/Contacts";
import Messages from "../pages/Messages";

export const publicRoutes: RoutesInt[] = [
        {path: '/', element: Auth}
    ],
    privateRoutes: RoutesInt[] = [
        {path: '/settings', element: Settings},
        {path: '/bookmarks', element: Bookmarks},
        {path: '/contacts', element: Contacts},
        {path: '/', element: Messages},
    ]
