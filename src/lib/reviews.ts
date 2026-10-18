import data from "@/data/reviews.json";

export type Review = { name: string; photo: string | null; rating: number; text: string; when: string; date: string | null };
export const reviewData = data as { rating: number | null; count: number; url: string | null; reviews: Review[] };
export const hasReviews = reviewData.reviews.length > 0 && !!reviewData.rating;
