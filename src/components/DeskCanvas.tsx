"use client";

import { useSelector } from "@tanstack/react-store";
import { deskStore } from "@/store/deskStore";
import { DropZone } from "./DropZone";
import { MonitorZone } from "./MonitorZone";

export function DeskCanvas() {
	const state = useSelector(deskStore);

	return (
		<div className="flex-1 w-[800px] bg-linear-to-b from-blue-50 to-gray-100 p-8 flex items-start justify-center">
			<div className="max-w-4xl relative w-full flex flex-col items-center">
				{/* Monitors */}
				<div className="relative bottom-[-30px]">
					<MonitorZone monitors={state.monitors} />
				</div>

				{/* Accesories */}
				<div className="relative w-full flex items-center justify-evenly px-12 space-x-4">
					<DropZone
						id="accLeft"
						label="Accessory"
						accepts={["coffee", "relax", "mouse"]}
						item={state.accLeft}
						className="w-32 h-32 -mb-2 z-30"
					/>

					<DropZone
						id="keyboard"
						label="Keyboard/Mouse"
						accepts={["keyboard", "mouse"]}
						item={state.keyboard}
						className="w-70 h-16 -mb-1 z-10"
					/>

					<DropZone
						id="accRight"
						label="Accessory"
						accepts={["coffee", "relax", "mouse"]}
						item={state.accRight}
						className="w-32 h-32 -mb-2 z-30"
					/>
				</div>

				{/* Table & Chair */}
				<div className="relative w-[90%]">
					<DropZone
						id="table"
						label="Drop Table Here"
						accepts={["table"]}
						item={state.table}
						className="absolute w-[100%] h-64 pt-8 block"
					/>
					<DropZone
						id="chair"
						label="Drop Chair Here"
						accepts={["chair"]}
						item={state.chair}
						className="absolute w-120 h-full pt-8 z-200 mx-auto top-[-350px]"
					/>
				</div>
			</div>
		</div>
	);
}
