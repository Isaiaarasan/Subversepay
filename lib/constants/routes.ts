export const DASHBOARD_ROOT = "/dashboard";
export const SUPER_ADMIN_ROOT = "/dashboard/super-admin";
export const ADMIN_ROOT = "/dashboard/admin";

export const ROUTES = {
    SUPER_ADMIN: {
        ROOT: SUPER_ADMIN_ROOT,
        FEATURES: {
            MERCHANTS: `${SUPER_ADMIN_ROOT}/features/merchants`,
            APPROVALS: `${SUPER_ADMIN_ROOT}/features/approvals`,
            ANALYTICS: `${SUPER_ADMIN_ROOT}/features/analytics`,
            ALERTS: `${SUPER_ADMIN_ROOT}/features/alerts`,
            SETTLEMENTS: `${SUPER_ADMIN_ROOT}/features/settlements`,
            SYSTEM_HEALTH: `${SUPER_ADMIN_ROOT}/features/system-health`,
            TICKETS: `${SUPER_ADMIN_ROOT}/features/tickets`,
        }
    },
    ADMIN: {
        ROOT: ADMIN_ROOT,
        MANAGE: {
            ROOT: `${ADMIN_ROOT}/manage`,
            MANAGERS: `${ADMIN_ROOT}/manage/managers`,
            CUSTOMERS: `${ADMIN_ROOT}/manage/customers`,
        },
        ANALYTICS: `${ADMIN_ROOT}/analytics`,
        PERFORMANCE: `${ADMIN_ROOT}/performance`,
        REVENUE_FORECAST: `${ADMIN_ROOT}/revenue-forecast`,
        SETTINGS: `${ADMIN_ROOT}/settings`,
        TICKETS: `${ADMIN_ROOT}/tickets`,
    },
    DASHBOARD: {
        ROOT: DASHBOARD_ROOT,
        FEATURES: {
            MERCHANTS: `${DASHBOARD_ROOT}/features/merchants`,
            APPROVALS: `${DASHBOARD_ROOT}/features/approvals`,
            ANALYTICS: `${DASHBOARD_ROOT}/features/analytics`,
            ALERTS: `${DASHBOARD_ROOT}/features/alerts`,
            SETTLEMENTS: `${DASHBOARD_ROOT}/features/settlements`,
            SYSTEM_HEALTH: `${DASHBOARD_ROOT}/features/system-health`,
            TICKETS: `${DASHBOARD_ROOT}/features/tickets`,
        }
    }
};
