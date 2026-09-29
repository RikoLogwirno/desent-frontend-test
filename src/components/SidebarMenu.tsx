"use client";

import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import Link from "next/link";

// Mock database of your draggable images
const ITEM_CATALOGUE = {
	Electronics: [
		{ id: "monitor-1", type: "monitor", label: "Apple monitor", price: 100, src: "/assets/monitor-1.avif" },
		{ id: "monitor-2", type: "monitor", label: "LG Ultrawide monitor", price: 50, src: "/assets/monitor-2.avif" },
		{ id: "monitor-3", type: "monitor", label: "Standard monitor", price: 20, src: "/assets/monitor-3.avif" },
		{ id: "keyboard-1", type: "keyboard", label: "Apple Keyboard", price: 50, src: "/assets/keyboard-1.avif" },
		{ id: "keyboard-2", type: "keyboard", label: "Logitech Keyboard", price: 10, src: "/assets/keyboard-2.avif" },
		{ id: "mouse-1", type: "mouse", label: "Logitect Mouse", price: 10, src: "/assets/mouse-1.avif" },
		{ id: "mouse-2", type: "mouse", label: "Apple Mouse", price: 30, src: "/assets/mouse-2.avif" },
		{ id: "mouse-3", type: "mouse", label: "Apple Trackpad", price: 45, src: "/assets/mouse-3.avif" },
	],
	Accessory: [
		{ id: "relax-1", type: "relax", label: "Air Purifier", price: 1000, src: "/assets/relax-1.avif" },
		{ id: "relax-3", type: "relax", label: "PS5", price: 25, src: "/assets/relax-3.webp" },
		{ id: "coffee-1", type: "coffee", label: "Bosch Coffee Maker", price: 20, src: "/assets/coffee-1.avif" },
		{ id: "coffee-2", type: "coffee", label: "Unique Coffee Maker", price: 25, src: "/assets/coffee-2.avif" },
		{ id: "starlink-1", type: "relax", label: "Starlink", price: 30, src: "/assets/acc-1.avif" },
		{ id: "nintendo-1", type: "relax", label: "Nintendo", price: 10, src: "/assets/acc-2.avif" },
	],
	Furniture: [
		{ id: "chair-1", type: "chair", label: "Standard Office Chair", price: 50, src: "/assets/chair-1.avif" },
		{ id: "chair-2", type: "chair", label: "Bean Bag", price: 35, src: "/assets/relax-2.webp" },
		{ id: "table-1", type: "table", label: "Standard Office desk", price: 50, src: "/assets/desk-1.png" },
		{ id: "table-2", type: "table", label: "Low Office desk", price: 30, src: "/assets/desk-2.webp" },
	],
};

type TabType = keyof typeof ITEM_CATALOGUE;

export function SidebarMenu() {
	const [activeTab, setActiveTab] = useState<TabType>("Electronics");

	return (
		<aside className="w-100 h-full bg-white border-r border-gray-200 flex flex-col shadow-sm p-3">
			<div className="p-6 border-b border-gray-100">
				<h2 className="text-xl font-bold text-gray-800">Work Desk Designer</h2>
			</div>

			{/* Tabs */}
			<div className="flex justify-between px-4 pt-4 space-x-2 border-b border-gray-100 overflow-x-auto">
				{(Object.keys(ITEM_CATALOGUE) as TabType[]).map((tab) => (
					<button
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors cursor-pointer ${
							activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
						}`}
					>
						{tab}
					</button>
				))}
			</div>

			{/* Draggable Items Grid */}
			<div className="p-4 grid grid-cols-2 gap-4 overflow-y-auto content-start flex-1">
				{ITEM_CATALOGUE[activeTab].map((item) => (
					<SidebarDraggableItem key={item.id} item={item} />
				))}
			</div>
			<div>
				<Link href="/checkout">
					<button className="bg-blue-500 p-4 py-2 rounded-xl w-full cursor-pointer hover:bg-blue-600 transition-all text-white mb-4 hover:mb-5 font-bold">
						Ready to Rent?
					</button>
				</Link>
			</div>
		</aside>
	);
}

// Sub-component for the individual draggable cards
function SidebarDraggableItem({
	item,
}: {
	item: {
		price: number;
		id: string;
		type: string;
		label: string;
		src: string;
	};
}) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: `new-${item.id}`, // ID prefix denotes this is coming from the sidebar
		data: {
			isNew: true,
			type: item.type,
			src: item.src,
			label: item.label,
			price: item.price,
		},
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				zIndex: 50, // Keep it above other elements while dragging
			}
		: undefined;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-xl cursor-grab active:cursor-grabbing hover:border-blue-400 hover:shadow-md transition-all touch-none"
		>
			{/* Fallback gray box if image is missing, otherwise render image */}
			<div className="w-16 h-16 mb-3 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
				<img src={item.src} alt={item.label} className="object-contain w-full h-full pointer-events-none" />
			</div>
			<span className="text-xs font-medium text-gray-600 text-center">{item.label}</span>
		</div>
	);
}
