
export interface MapLocation {
    id: number;
    name: string;
    code: string;
    coordinates: { x: number; y: number };
    category: "admin" | "academic" | "practice" | "library" | "auditorium" | "dorm" | "parking";
    description: string;
    facilities: string[];
    images: string[];
}
