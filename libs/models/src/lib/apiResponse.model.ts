// lets standardize our api responses

// is this a good implementation?

export interface ApiResponse {
  status: number;
  message: string;
  error?: Error;
  data?: unknown; // depends on endpoint, not sure how to approach this
}
