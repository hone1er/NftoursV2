import { z } from "zod";

// creating a schema for strings
export const Data = z.object({name: z.string()});

export const NFTschema = z.object({
    id: z.number({

    }),
    name: z.string({
        required_error: "name is required",
        invalid_type_error: "name must be a string",
      }).min(1).optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    location: z.string().optional(),
    geoCode: z.object({lat: z.number(), lng: z.number()}),
    price: z.number(),
    isFavorite: z.boolean(),
    isForSale: z.boolean().optional(),
    owner: z.string().optional(),
})

export type NFTType = z.infer<typeof NFTschema>
