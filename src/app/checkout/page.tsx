"use client";

import { useSelector } from "@tanstack/react-store";
import { deskStore, ItemData } from "@/store/deskStore";
import Link from "next/link";

// Flatten the catalogue once outside the component render cycle
// const FLAT_CATALOGUE = Object.values(ITEM_CATALOGUE).flat()

export default function CheckoutPage() {
	const state = useSelector(deskStore);

	const rawCartItems = [
		...(state.monitors || []),
		state.accLeft,
		state.keyboard,
		state.accRight,
		state.table,
		state.chair,
	].filter(Boolean) as Array<ItemData>;

	const cartItems = rawCartItems.map((storeVal) => {
		return {
			instanceId: storeVal.id,
			slotType: storeVal.type,
			label: storeVal.label,
			price: storeVal.price || 0,
			src: storeVal.src,
		};
	});

	const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
	const shipping = subtotal > 0 ? 49 : 0;
	const total = subtotal + shipping;

	if (cartItems.length === 0) {
		return (
			<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
				<h1 className="text-2xl font-semibold text-gray-900 mb-4">Your workspace is empty</h1>
				<p className="text-gray-500 mb-8">Design your dream desk before checking out.</p>
				<Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
					Back to Designer
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto space-y-8">
				<div>
					<h1 className="text-3xl font-bold text-gray-900">Review your workspace</h1>
					<p className="mt-2 text-sm text-gray-500">Confirm your custom setup. All items include a 3-year warranty.</p>
				</div>

				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
					<ul className="divide-y divide-gray-100">
						{cartItems.map((item) => (
							<li key={item.instanceId} className="p-6 flex items-center hover:bg-gray-50/50 transition-colors">
								<div className="h-20 w-20 flex-shrink-0 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center p-2">
									<img src={item.src} alt={item.label} className="h-full w-full object-contain" />
								</div>

								<div className="ml-6 flex-1 flex flex-col">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="text-base font-medium text-gray-900">{item.label}</h3>
											<p className="mt-1 text-sm text-gray-500 capitalize">Slot: {item.slotType}</p>
										</div>
										<p className="text-base font-semibold text-gray-900">${item.price.toFixed(2)}</p>
									</div>
								</div>
							</li>
						))}
					</ul>

					<div className="bg-gray-50 p-6 border-t border-gray-100">
						<dl className="space-y-4 text-sm text-gray-600">
							<div className="flex justify-between">
								<dt>Subtotal</dt>
								<dd className="font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
							</div>
							<div className="flex justify-between">
								<dt>Flat Rate Shipping</dt>
								<dd className="font-medium text-gray-900">${shipping.toFixed(2)}</dd>
							</div>
							<div className="flex justify-between items-center pt-4 border-t border-gray-200">
								<dt className="text-base font-bold text-gray-900">Total</dt>
								<dd className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</dd>
							</div>
						</dl>

						<div className="mt-8 flex gap-4">
							<Link
								href="/"
								className="w-1/3 flex justify-center items-center px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition"
							>
								Edit Design
							</Link>
							<button
								type="button"
								className="w-2/3 flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gray-900 hover:bg-gray-800 shadow-sm transition"
							>
								Proceed to Payment
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
