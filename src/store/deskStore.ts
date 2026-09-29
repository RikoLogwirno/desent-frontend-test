import { Store } from "@tanstack/store";

export type ItemData = {
	id: string;
	type: string;
	src: string;
	price: number;
	label: string;
};

interface DeskState {
	monitors: ItemData[]; // Array to support up to 3
	accLeft: ItemData | null;
	keyboard: ItemData | null;
	accRight: ItemData | null;
	table: ItemData | null;
	chair: ItemData | null;
}

export const deskStore = new Store<DeskState>({
	monitors: [],
	accLeft: null,
	keyboard: null,
	accRight: null,
	// table: { id: "default-table", type: "table", src: "/images/table-wood.png" },
	table: null,
	chair: null,
});

export const deskActions = {
	// Replace a single item slot
	setSlot: (slotId: keyof Omit<DeskState, "monitors">, item: ItemData) =>
		deskStore.setState((state) => ({ ...state, [slotId]: item })),

	// Replace a single item slot
	removeSlot: (slotId: keyof Omit<DeskState, "monitors">) =>
		deskStore.setState((state) => {
			const newState: DeskState = { ...state };
			for (const k in state) {
				if (!Object.hasOwn(state, k)) continue;
				const element = state[k as keyof DeskState];

				// if (typeof element === "object" && element !== null && !element.length) {
				if (element !== null && "id" in element) {
					if (element.id === slotId) {
						delete newState[k as keyof DeskState];
					}
				}
			}
			return newState;
		}),

	// Add a monitor (up to 3)
	addMonitor: (item: ItemData) =>
		deskStore.setState((state) => ({
			...state,
			monitors: state.monitors.length < 3 ? [...state.monitors, item] : state.monitors,
		})),

	// Remove a monitor
	removeMonitor: (id: string) =>
		deskStore.setState((state) => ({
			...state,
			monitors: state.monitors.filter((m) => m.id !== id),
		})),
};
