//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CzLkBmna.js
var manifest = {
	"284791322afb33f0507c76f01806ad0e92d8b4c1546f27882069b08e87f399d4": {
		functionName: "verifyAdminPasswordFn_createServerFn_handler",
		importer: () => import("./_ssr/admin-fTnTFj7l.mjs")
	},
	"4f18beca459416fc6adf0bb56731edb7f4f6b814adc07be646227d539db5a2dd": {
		functionName: "updateBookingStatusFn_createServerFn_handler",
		importer: () => import("./_ssr/admin-fTnTFj7l.mjs")
	},
	"ae7a266c0de07e640edd35815432216b8f76b4502540d9e2f29bb46bd962814c": {
		functionName: "submitBookingServerFn_createServerFn_handler",
		importer: () => import("./_ssr/bookings-BXoENpy_.mjs")
	},
	"c4c18eaf6f26a8c1fc855a5be9720ee8298906fbd68fd575e10c9333dc310af6": {
		functionName: "getBookingsFn_createServerFn_handler",
		importer: () => import("./_ssr/admin-fTnTFj7l.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
