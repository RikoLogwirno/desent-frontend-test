import { Store } from "@tanstack/store";

interface AppState {
	isSidebarOpen: boolean;
	activeFilter: string;
}

export const store = new Store<AppState>({
	isSidebarOpen: true,
	activeFilter: "all",
});

export const actions = {
	toggleSidebar: () => store.setState((state) => ({ ...state, isSidebarOpen: !state.isSidebarOpen })),
	setFilter: (filter: string) => store.setState((state) => ({ ...state, activeFilter: filter })),
};
