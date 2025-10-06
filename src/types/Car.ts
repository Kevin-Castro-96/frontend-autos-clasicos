type Car = {
id: string;
brand: string;
model: string;
year: number;
engine: string;
image?: string;
description?: string;
};

type ApiResponse = {
  success: boolean;
  data: Car[];
  message?: string;
};