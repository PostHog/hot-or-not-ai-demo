module.exports = [
"[project]/.next-internal/server/app/api/leads/[id]/rate/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[project]/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSession",
    ()=>createSession,
    "getAnonymousSession",
    ()=>getAnonymousSession,
    "getSession",
    ()=>getSession,
    "getSessionOrAnonymous",
    ()=>getSessionOrAnonymous,
    "hashPassword",
    ()=>hashPassword,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "signup",
    ()=>signup,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/jwt/verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET || 'hot-or-not-leads-secret-key-2002');
// Mock user database - in production this would be a real database
const users = [
    {
        id: '1',
        email: 'demo@hotornot.com',
        name: 'Demo User',
        passwordHash: '$2a$10$m9SF5L1FFt/5kBW0DjDh/uDho4SJsjbJ0j5hUaB2minPRqf9M3YOC'
    }
];
function getAnonymousSession() {
    return {
        userId: 'anonymous',
        email: '',
        name: 'Guest'
    };
}
async function getSessionOrAnonymous() {
    const session = await getSession();
    return session || getAnonymousSession();
}
async function hashPassword(password) {
    const bcrypt = await __turbopack_context__.A("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript, async loader)");
    return bcrypt.hash(password, 10);
}
async function verifyPassword(password, hash) {
    const bcrypt = await __turbopack_context__.A("[project]/node_modules/bcryptjs/index.js [app-route] (ecmascript, async loader)");
    return bcrypt.compare(password, hash);
}
async function createSession(user) {
    const session = {
        userId: user.id,
        email: user.email,
        name: user.name
    };
    const token = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"](session).setProtectedHeader({
        alg: 'HS256'
    }).setExpirationTime('7d').sign(secretKey);
    return token;
}
async function getSession() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get('session')?.value;
    if (!token) return null;
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secretKey);
        return payload;
    } catch  {
        return null;
    }
}
async function login(email, password) {
    const user = users.find((u)=>u.email === email);
    if (!user) {
        return {
            success: false,
            error: 'Invalid email or password'
        };
    }
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
        return {
            success: false,
            error: 'Invalid email or password'
        };
    }
    const token = await createSession({
        id: user.id,
        email: user.email,
        name: user.name
    });
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
    });
    return {
        success: true
    };
}
async function signup(email, password, name) {
    const existing = users.find((u)=>u.email === email);
    if (existing) {
        return {
            success: false,
            error: 'Email already registered'
        };
    }
    const passwordHash = await hashPassword(password);
    const newUser = {
        id: String(users.length + 1),
        email,
        name,
        passwordHash
    };
    users.push(newUser);
    const token = await createSession({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
    });
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
    });
    return {
        success: true
    };
}
async function logout() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('session');
}
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
"[project]/app/api/leads/[id]/rate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$leads$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/leads.ts [app-route] (ecmascript)");
;
;
;
async function POST(request, { params }) {
    try {
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionOrAnonymous"])();
        const { id } = await params;
        const { score } = await request.json();
        if (!score || score < 1 || score > 10) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Score must be between 1 and 10'
            }, {
                status: 400
            });
        }
        const lead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$leads$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLead"])(id);
        if (!lead) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Lead not found'
            }, {
                status: 404
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$leads$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addRating"])(id, session.userId, score);
        const { average, total } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$leads$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateAverageRating"])(id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            averageRating: average,
            totalRatings: total
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to rate lead'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__427f34cb._.js.map