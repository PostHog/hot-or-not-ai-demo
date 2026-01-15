module.exports = [
"[project]/.next-internal/server/app/api/leaderboard/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/lib/leads.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addRating",
    ()=>addRating,
    "calculateAverageRating",
    ()=>calculateAverageRating,
    "getLead",
    ()=>getLead,
    "getLeadRatings",
    ()=>getLeadRatings,
    "getLeaderboard",
    ()=>getLeaderboard,
    "getLeads",
    ()=>getLeads,
    "getLeadsWithRatings",
    ()=>getLeadsWithRatings,
    "getRandomUnratedLead",
    ()=>getRandomUnratedLead,
    "getRatings",
    ()=>getRatings,
    "hasUserRatedLead",
    ()=>hasUserRatedLead,
    "saveRatings",
    ()=>saveRatings
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const leadsPath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), 'lib/data/leads.json');
const ratingsPath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["join"])(process.cwd(), 'lib/data/ratings.json');
function getLeads() {
    const data = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"])(leadsPath, 'utf-8');
    return JSON.parse(data).leads;
}
function getLead(id) {
    const leads = getLeads();
    return leads.find((lead)=>lead.id === id);
}
function getRatings() {
    try {
        const data = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["readFileSync"])(ratingsPath, 'utf-8');
        return JSON.parse(data).ratings || {};
    } catch  {
        return {};
    }
}
function saveRatings(ratings) {
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["writeFileSync"])(ratingsPath, JSON.stringify({
        ratings
    }, null, 2));
}
function addRating(leadId, userId, score) {
    const ratings = getRatings();
    if (!ratings[leadId]) {
        ratings[leadId] = [];
    }
    // Check if user already rated this lead
    const existingIndex = ratings[leadId].findIndex((r)=>r.userId === userId);
    const newRating = {
        userId,
        leadId,
        score,
        ratedAt: new Date().toISOString()
    };
    if (existingIndex >= 0) {
        // Update existing rating
        ratings[leadId][existingIndex] = newRating;
    } else {
        // Add new rating
        ratings[leadId].push(newRating);
    }
    saveRatings(ratings);
}
function getLeadRatings(leadId) {
    const ratings = getRatings();
    return ratings[leadId] || [];
}
function calculateAverageRating(leadId) {
    const ratings = getLeadRatings(leadId);
    if (ratings.length === 0) {
        return {
            average: null,
            total: 0
        };
    }
    const sum = ratings.reduce((acc, r)=>acc + r.score, 0);
    return {
        average: Math.round(sum / ratings.length * 10) / 10,
        total: ratings.length
    };
}
function getLeadsWithRatings() {
    const leads = getLeads();
    return leads.map((lead)=>{
        const { average, total } = calculateAverageRating(lead.id);
        return {
            ...lead,
            averageRating: average,
            totalRatings: total
        };
    });
}
function getLeaderboard() {
    const leadsWithRatings = getLeadsWithRatings();
    // Sort by average rating (descending), then by total ratings (descending)
    return leadsWithRatings.filter((lead)=>lead.averageRating !== null).sort((a, b)=>{
        if (b.averageRating !== a.averageRating) {
            return (b.averageRating || 0) - (a.averageRating || 0);
        }
        return b.totalRatings - a.totalRatings;
    });
}
function getRandomUnratedLead(userId, skipIds = []) {
    const leads = getLeads();
    const ratings = getRatings();
    // Get leads not rated by this user and not in skip list
    const unratedLeads = leads.filter((lead)=>{
        const leadRatings = ratings[lead.id] || [];
        const hasUserRated = leadRatings.some((r)=>r.userId === userId);
        const isSkipped = skipIds.includes(lead.id);
        return !hasUserRated && !isSkipped;
    });
    if (unratedLeads.length === 0) {
        // If all leads are rated or skipped, return a random lead not in skip list
        const availableLeads = leads.filter((lead)=>!skipIds.includes(lead.id));
        if (availableLeads.length === 0) {
            // If all leads are skipped, reset and return any random lead
            return leads[Math.floor(Math.random() * leads.length)] || null;
        }
        return availableLeads[Math.floor(Math.random() * availableLeads.length)] || null;
    }
    // Return a random unrated lead
    return unratedLeads[Math.floor(Math.random() * unratedLeads.length)] || null;
}
function hasUserRatedLead(userId, leadId) {
    const ratings = getRatings();
    const leadRatings = ratings[leadId] || [];
    return leadRatings.some((r)=>r.userId === userId);
}
}),
"[project]/app/api/leaderboard/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$leads$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/leads.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const leaderboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$leads$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLeaderboard"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            leaderboard
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch leaderboard'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06d6d1d7._.js.map