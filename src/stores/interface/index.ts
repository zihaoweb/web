export type LayoutType = "vertical" | "classic" | "transverse" | "columns";
export type AssemblySizeType = "large" | "default" | "small"
export type LanguageType = "zh" | "en" | null
export interface GlobalState {
  layout: LayoutType;
  assemblySize: AssemblySizeType;
  language: LanguageType;
  maximize: boolean;
  primary: string;
  isDark: boolean;
  isGrey: boolean;
  isWeak: boolean;
  asideInverted: boolean;
  headerInverted: boolean;
  isCollapse: boolean;
  accordion: boolean;
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  tabs: boolean;
  tabsIcon: boolean;
  footer: boolean;
}
/* Menu */
declare namespace Menu {
  interface MenuOptions {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: MetaProps;
    children?: MenuOptions[];
  }
  interface MetaProps {
    icon: string;
    title: string;
    activeMenu?: string;
    isLink?: string;
    isHide: boolean;
    isFull: boolean;
    isAffix: boolean;
    isKeepAlive: boolean;
  }
}

// 请求响应参数（不包含data）
export interface Result {
  code: string;
  msg: string;
}

export interface UserState {
  token: string,
  userInfo: { name: string }
}

export interface ResultData<T = any> extends Result {
  data: T;
}

export interface AuthState {
  routeName: string;
  authButtonList: {
    [key: string]: string[];
  };
  authMenuList: Menu.MenuOptions[];
}

// keepAliveState
export interface KeepAliveState {
  keepAliveName: string[]
}

export interface TabsMenuProps {
  icon: string,
  title: string,
  path: string,
  name: string,
  close: boolean,
  isKeepAlive: boolean
}

export interface TabsState {
  tabList: TabsMenuProps[]
}

