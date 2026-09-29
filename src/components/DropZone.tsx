"use client";

import { useDroppable } from "@dnd-kit/core";
import { deskActions, deskStore, ItemData } from "@/store/deskStore";
import { useSelector } from "@tanstack/react-store";

interface DropZoneProps {
	id: string;
	label: string;
	accepts: string[]; // The type of acceptable dropppable, ['plant', 'lamp'] or ['keyboard']
	item: ItemData | null;
	className?: string;
}

export function DropZone({ id, label, item, className = "", accepts }: DropZoneProps) {
	const { isOver, setNodeRef } = useDroppable({
		id,
		data: { accepts },
	});
	const state = useSelector(deskStore);

	return (
		<div
			ref={setNodeRef}
			className={`relative flex items-center justify-center transition-all ${
				isOver ? "bg-blue-100/50 outline-dashed outline-2 outline-blue-400" : "hover:bg-gray-50/20"
			} ${className}`}
		>
			{item ? (
				<div className={`relative group`}>
					<img src={item.src} alt={item.type} className="object-contain h-full w-full pointer-events-none drop-shadow-md" />
					{/* Hover to reveal delete button */}
					<button
						onClick={() => {
							deskActions.removeSlot(item.id as any);
						}}
						className="absolute -top-4 -right-4 bg-white text-gray-800 border shadow-md hover:bg-red-50 hover:text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-all z-3000"
						aria-label="Remove monitor"
					>
						✕
					</button>
				</div>
			) : (
				<span className="text-sm text-gray-400/70 border border-dashed border-gray-300 rounded-lg p-2 w-full text-center mb-4">
					{label}
				</span>
			)}
		</div>
	);
}
