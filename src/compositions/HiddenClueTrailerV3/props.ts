import {z} from 'zod';
import {reelUrl} from '../../audio/v3-timeline';
export const v3Schema=z.object({hookLine1:z.string(),hookLine2:z.string(),finalQuestion:z.string(),cta:z.string(),variant:z.string(),suspenseLevel:z.number().min(0).max(1),destination:z.literal(reelUrl)});
export type V3Props=z.infer<typeof v3Schema>;
export const v3Defaults:V3Props={hookLine1:'LE FILM AVAIT UN INDICE.',hookLine2:"PERSONNE NE L'A REMARQUÉ.",finalQuestion:'TU CROIS AVOIR COMPRIS ?',cta:'REGARDE ENCORE.',variant:'v3',suspenseLevel:.75,destination:reelUrl};
