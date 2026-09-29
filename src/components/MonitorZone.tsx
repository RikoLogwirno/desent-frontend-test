"use client";

import { useDroppable } from "@dnd-kit/core";
import { ItemData, deskActions } from "@/store/deskStore";

interface MonitorZoneProps {
	monitors: ItemData[];
}

export function MonitorZone({ monitors }: MonitorZoneProps) {
	const isFull = monitors.length >= 3;

	// 1. Hook up the drop zone for monitors
	const { isOver, setNodeRef } = useDroppable({
		id: "monitors",
		data: {
			// Accept both standard and ultrawide monitors
			accepts: ["monitor", "monitor-ultrawide"],
		},
	});

	// 2. Determine styling based on drag state and capacity
	const getDropZoneStyles = () => {
		if (!isOver) return "border-transparent";
		if (isFull) return "bg-red-50/80 border-red-400 border-dashed"; // Reject visual
		return "bg-blue-50/80 border-blue-400 border-dashed"; // Accept visual
	};

	return (
		<div
			ref={setNodeRef}
			className={`relative flex items-end justify-center w-full h-56 transition-all border-2 rounded-xl z-10 ${getDropZoneStyles()}`}
		>
			{monitors.length === 0 ? (
				// Empty State Placeholder
				<div className="flex items-center justify-center w-full h-full text-gray-400/80 font-medium border-2 border-dashed border-gray-300/50 rounded-xl">
					Drag up to 3 monitors here
				</div>
			) : (
				// Render placed monitors
				<div className="flex items-end space-x-2">
					{monitors.map((monitor) => {
						// Dynamically adjust the width based on the item type
						const isUltrawide = monitor.type.includes("ultrawide");
						const widthClass = isUltrawide ? "w-80" : "w-48";

						return (
							<div key={monitor.id} className={`relative group ${widthClass}`}>
								<img src={monitor.src} alt={monitor.type} className="object-contain w-full drop-shadow-xl pointer-events-none" />

								{/* Hover to reveal delete button */}
								<button
									onClick={() => deskActions.removeMonitor(monitor.id)}
									className="absolute -top-4 -right-4 bg-white text-gray-800 border shadow-md hover:bg-red-50 hover:text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-all z-30"
									aria-label="Remove monitor"
								>
									✕
								</button>
							</div>
						);
					})}
				</div>
			)}

			{/* Subtle capacity indicator */}
			{monitors.length > 0 && (
				<div className="absolute top-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
					{isFull ? "Monitor limit reached" : `${3 - monitors.length} slot(s) remaining`}
				</div>
			)}
		</div>
	);
}
