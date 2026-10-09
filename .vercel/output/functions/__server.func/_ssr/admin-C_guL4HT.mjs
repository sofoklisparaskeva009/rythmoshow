import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { i as updateBookingStatus, n as getBookings, t as createServerRpc } from "./db-bArIZMgd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C_guL4HT.js
function getAdminPassword() {
	const pw = process.env["ADMIN_PASSWORD"];
	if (pw) return pw.trim();
	return "rythmo2026";
}
var verifyAdminPasswordFn_createServerFn_handler = createServerRpc({
	id: "284791322afb33f0507c76f01806ad0e92d8b4c1546f27882069b08e87f399d4",
	name: "verifyAdminPasswordFn",
	filename: "src/api/admin.ts"
}, (opts) => verifyAdminPasswordFn.__executeServer(opts));
var verifyAdminPasswordFn = createServerFn({ method: "POST" }).validator((data) => {
	return objectType({ password: stringType() }).parse(data);
}).handler(verifyAdminPasswordFn_createServerFn_handler, async ({ data }) => {
	const correct = getAdminPassword();
	if (data.password === correct) return { success: true };
	return {
		success: false,
		error: "Incorrect passcode."
	};
});
var getBookingsFn_createServerFn_handler = createServerRpc({
	id: "c4c18eaf6f26a8c1fc855a5be9720ee8298906fbd68fd575e10c9333dc310af6",
	name: "getBookingsFn",
	filename: "src/api/admin.ts"
}, (opts) => getBookingsFn.__executeServer(opts));
var getBookingsFn = createServerFn({ method: "GET" }).handler(getBookingsFn_createServerFn_handler, async () => {
	return { bookings: await getBookings() };
});
var updateBookingStatusFn_createServerFn_handler = createServerRpc({
	id: "4f18beca459416fc6adf0bb56731edb7f4f6b814adc07be646227d539db5a2dd",
	name: "updateBookingStatusFn",
	filename: "src/api/admin.ts"
}, (opts) => updateBookingStatusFn.__executeServer(opts));
var updateBookingStatusFn = createServerFn({ method: "POST" }).validator((data) => {
	return objectType({
		id: numberType(),
		status: enumType([
			"Pending",
			"Confirmed",
			"Completed"
		])
	}).parse(data);
}).handler(updateBookingStatusFn_createServerFn_handler, async ({ data }) => {
	try {
		await updateBookingStatus(data.id, data.status);
		console.info(`[Admin] Booking id=${data.id} status updated to "${data.status}"`);
		return { success: true };
	} catch (err) {
		console.error(`[Admin] updateBookingStatus error for id=${data.id}:`, err);
		throw new Error(err?.message ?? "Failed to update booking status.");
	}
});
//#endregion
export { getBookingsFn_createServerFn_handler, updateBookingStatusFn_createServerFn_handler, verifyAdminPasswordFn_createServerFn_handler };
