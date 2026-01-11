"use server";

/**
 * Merchants Service
 * Handles all business logic for merchants management
 */

export interface Merchant {
    id: number;
    name: string;
    sector: string;
    subscribers: number;
    tpv: string;
    revenue: string;
    growth: number;
    status: string;
    logo: string;
    email: string;
    phone: string;
    address: string;
    gst: string;
    bank: {
        name: string;
        acc: string;
        ifsc: string;
    };
    joinedDate?: string;
}

/**
 * Fetch all merchants
 * In production, this would fetch from Supabase
 */
export async function getMerchants(): Promise<Merchant[]> {
    // TODO: Replace with actual Supabase query
    // const supabase = await createClient();
    // const { data, error } = await supabase.from('merchants').select('*');

    return [
        {
            id: 1,
            name: "SpeedNet ISP",
            sector: "Internet",
            subscribers: 12500,
            tpv: "₹3.5 Cr",
            revenue: "₹12.5 L",
            growth: 12.5,
            status: "Active",
            logo: "SN",
            email: "contact@speednet.com",
            phone: "+91 98765 43210",
            address: "123, Tech Park, Bangalore",
            gst: "29ABCDE1234F1Z5",
            joinedDate: "2024-01-15",
            bank: { name: "HDFC Bank", acc: "1234567890", ifsc: "HDFC0001234" },
        },
        {
            id: 2,
            name: "CableNet Sols",
            sector: "Cable",
            subscribers: 8200,
            tpv: "₹2.1 Cr",
            revenue: "₹8.2 L",
            growth: -2.4,
            status: "Active",
            logo: "CN",
            email: "support@cablenet.in",
            phone: "+91 98765 11111",
            address: "45, Media Street, Mumbai",
            gst: "27AAAAA0000A1Z5",
            joinedDate: "2024-02-20",
            bank: { name: "ICICI Bank", acc: "0987654321", ifsc: "ICIC0001234" },
        },
        {
            id: 3,
            name: "FitZone Gyms",
            sector: "Fitness",
            subscribers: 450,
            tpv: "₹1.2 Cr",
            revenue: "₹3.5 L",
            growth: 5.8,
            status: "Active",
            logo: "FZ",
            email: "info@fitzone.com",
            phone: "+91 98765 22222",
            address: "78, Health Avenue, Delhi",
            gst: "07BBBBB1111B1Z5",
            joinedDate: "2024-03-10",
            bank: { name: "SBI", acc: "1122334455", ifsc: "SBIN0001234" },
        },
        {
            id: 4,
            name: "Urban Fibernet",
            sector: "Internet",
            subscribers: 6800,
            tpv: "₹1.8 Cr",
            revenue: "₹6.1 L",
            growth: 8.1,
            status: "Active",
            logo: "UF",
            email: "hello@urbanfiber.net",
            phone: "+91 98765 33333",
            address: "90, Cyber City, Gurgaon",
            gst: "06CCCCC2222C1Z5",
            joinedDate: "2024-04-05",
            bank: { name: "Axis Bank", acc: "6789012345", ifsc: "UTIB0001234" },
        },
        {
            id: 5,
            name: "Metro Cable",
            sector: "Cable",
            subscribers: 3200,
            tpv: "₹95 L",
            revenue: "₹2.8 L",
            growth: 0.5,
            status: "Inactive",
            logo: "MC",
            email: "contact@metrocable.com",
            phone: "+91 98765 44444",
            address: "10, Film City, Noida",
            gst: "09DDDDD3333D1Z5",
            joinedDate: "2023-11-12",
            bank: { name: "PNB", acc: "5544332211", ifsc: "PUNB0001234" },
        },
    ];
}

/**
 * Get merchant by ID
 */
export async function getMerchantById(id: number): Promise<Merchant | null> {
    const merchants = await getMerchants();
    return merchants.find((m) => m.id === id) || null;
}

/**
 * Filter merchants by status
 */
export async function getMerchantsByStatus(status: string): Promise<Merchant[]> {
    const merchants = await getMerchants();
    if (status === "all") return merchants;
    return merchants.filter((m) => m.status.toLowerCase() === status.toLowerCase());
}

/**
 * Search merchants by name
 */
export async function searchMerchants(query: string): Promise<Merchant[]> {
    const merchants = await getMerchants();
    const lowerQuery = query.toLowerCase();
    return merchants.filter((m) => m.name.toLowerCase().includes(lowerQuery));
}
