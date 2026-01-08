// UI Action Labels
export const UI_LABELS = {
  APPROVE: 'Approve',
  REJECT: 'Reject',
  REVIEW: 'Review',
  EDIT: 'Edit',
  DELETE: 'Delete',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  CLOSE: 'Close',
  VIEW_DETAILS: 'View Details',
  EXPORT: 'Export',
  DOWNLOAD_REPORT: 'Download Report',
  CLEAR_CRITICAL: 'Clear Critical',
  ASSIGN: 'Assign',
  RESOLVE: 'Resolve',
  SEARCH: 'Search',
  FILTER: 'Filter',
  REFRESH: 'Refresh',
  LOAD_MORE: 'Load More',
  OVERVIEW: 'Overview',
  SAVE: 'Save',
} as const;

// Status Labels
export const STATUS_LABELS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
  OPEN: 'Open',
  CLOSED: 'Closed',
  IN_PROGRESS: 'In Progress',
} as const;

// Form Labels
export const FORM_LABELS = {
  SEARCH_MERCHANTS: 'Search merchants, sectors...',
  SEARCH_TICKETS: 'Search tickets by title, ID, user...',
  SEARCH_ID_MERCHANT: 'Search ID, merchant...',
  REASON_FOR_DEACTIVATION: 'Reason for Deactivation',
  RESOLUTION_SUMMARY: 'Resolution summary...',
  PLEASE_DETAIL_REASON: 'Please detail the reason...',
} as const;

// Time Range Options
export const TIME_RANGES = [
  { value: 'This Month', label: 'This Month' },
  { value: 'Last Month', label: 'Last Month' },
  { value: 'This Quarter', label: 'This Quarter' },
  { value: 'Last 7 days', label: 'Last 7 days' },
  { value: 'Last 30 days', label: 'Last 30 days' },
  { value: 'Last 3 months', label: 'Last 3 months' },
  { value: 'Last year', label: 'Last year' },
] as const;

// Priority Labels
export const PRIORITY_LABELS = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
} as const;

// Table Headers
export const TABLE_HEADERS = {
  MERCHANT_ENTITY: 'Merchant Entity',
  TYPE: 'Type',
  APPLIED_DATE: 'Applied Date',
  DOCUMENTS: 'Documents',
  ACTIONS: 'Actions',
  TXN_ID: 'Txn ID',
  FROM: 'From',
  TO: 'To',
  BANK: 'Bank',
  AMOUNT: 'Amount',
  DATE: 'Date',
  STATUS: 'Status',
  MERCHANT: 'Merchant',
  TPV_TODAY: 'TPV (Today)',
} as const;