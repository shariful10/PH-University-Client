import { ReactNode } from "react";

export type TRoute = {
	path: string | undefined;
	element: ReactNode;
};

export type TUserPath =
	| {
			name: string;
			path?: string;
			element?: ReactNode;
			children?: TUserPath[];
	  }
	| undefined;

export type TSidebarItem =
	| {
			key: string;
			label: ReactNode;
			children?: TSidebarItem[];
	  }
	| undefined;
