"use client";

import { useState } from "react";
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from "@dnd-kit/core";
import { deskActions } from "@/store/deskStore";
import { SidebarMenu } from "./SidebarMenu";
import { DeskCanvas } from "./DeskCanvas";

export function DeskBuilder() {
	const [activeDragItem, setActiveDragItem] = useState<any>(null);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveDragItem(event.active.data.current);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		setActiveDragItem(null); // Clear overlay

		const { active, over } = event;
		if (!over) return;

		const draggedItem = active.data.current;
		const slotId = over.id as string;
		const acceptedTypes = over.data.current?.accepts || [];

		// Enforce constraints: Does this slot accept this item type?
		if (!acceptedTypes.includes(draggedItem?.type) && slotId !== "monitors") {
			return; // Cancel drop
		}

		const itemPayload = {
			id: `${draggedItem?.type}-${Date.now()}`,
			type: draggedItem?.type,
			src: draggedItem?.src,
			price: draggedItem?.price,
			label: draggedItem?.label,
		};

		if (slotId === "monitors") {
			deskActions.addMonitor(itemPayload);
		} else {
			// TypeScript safety for our specific store keys
			deskActions.setSlot(slotId as any, itemPayload);
		}
	};

	return (
		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
			<div className="w-full flex h-screen overflow-hidden">
				<SidebarMenu />
				<DeskCanvas />
			</div>

			{/* FIX: DragOverlay renders outside the sidebar, preventing overflow clipping */}
			<DragOverlay dropAnimation={null}>
				{activeDragItem ? (
					<div className="w-24 h-24 bg-white shadow-2xl rounded-xl border-2 border-blue-500 p-2 opacity-90 scale-105 transition-transform">
						<img src={activeDragItem.src} className="w-full h-full object-contain" alt="" />
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	);
}
