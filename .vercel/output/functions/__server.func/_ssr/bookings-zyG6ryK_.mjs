import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { i as saveBooking, o as sendBookingNotification, t as createServerRpc } from "./email-VN-GhNlB.mjs";
import { i as stringType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-zyG6ryK_.js
var bookingInputSchema = objectType({
	fullName: stringType().trim().min(1, "Name is required"),
	email: stringType().trim().email("Invalid email address"),
	phone: stringType().trim().min(1, "Phone number is required"),
	eventDate: stringType().trim().min(1, "Event date is required"),
	eventType: stringType().trim().min(1, "Event type is required"),
	location: stringType().optional().default(""),
	djOption: stringType().optional().default(""),
	notes: stringType().optional().default(""),
	language: enumType(["gr", "en"]).optional().default("gr")
});
var submitBookingServerFn_createServerFn_handler = createServerRpc({
	id: "ae7a266c0de07e640edd35815432216b8f76b4502540d9e2f29bb46bd962814c",
	name: "submitBookingServerFn",
	filename: "src/api/bookings.ts"
}, (opts) => submitBookingServerFn.__executeServer(opts));
var submitBookingServerFn = createServerFn({ method: "POST" }).validator((data) => {
	return bookingInputSchema.parse(data);
}).handler(submitBookingServerFn_createServerFn_handler, async ({ data }) => {
	let dbResult;
	try {
		dbResult = await saveBooking(data);
		console.info(`[Booking] Saved to DB for ${data.fullName} (ID: ${dbResult.booking?.id ?? "?"})`);
	} catch (err) {
		console.error("[Booking] Failed to save booking:", err);
		throw new Error(err?.message || "Failed to save booking to database.");
	}
	const emailResult = await sendBookingNotification(data);
	if (emailResult.success) console.info(`[Booking] Email notification sent (messageId: ${emailResult.messageId})`);
	else console.warn(`[Booking] Email notification failed: ${emailResult.error}`);
	return {
		...dbResult,
		emailSent: emailResult.success,
		emailError: emailResult.success ? null : emailResult.error
	};
});
//#endregion
export { submitBookingServerFn_createServerFn_handler };
