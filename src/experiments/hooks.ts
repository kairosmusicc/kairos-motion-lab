import { z } from "zod";
export const hiddenClueSchema = z.object({
  hookLine1: z.string().min(1).max(100),
  hookLine2: z.string().min(1).max(100),
  finalQuestion: z.string().min(1).max(50),
  cta: z.string().min(1).max(80),
  suspenseLevel: z.number().min(0).max(1),
  variant: z.string().regex(/^[a-zA-Z0-9_-]+$/),
  audioSrc: z.string().nullable().default(null),
  audioOffsetSeconds: z.number().min(0).default(0),
  audioGain: z.number().min(0).max(2).default(0.85),
});
export type HiddenClueProps = z.infer<typeof hiddenClueSchema>;
/** Only one creative variant is produced in V1. Future hooks belong in this registry. */
export const variants: Record<string, HiddenClueProps> = {
  v2: {
    hookLine1: "LE FILM AVAIT UN INDICE.",
    hookLine2: "PERSONNE NE L'A REMARQUÉ.",
    finalQuestion: "TU L'AS VU ?",
    cta: "kairosarchives.com",
    suspenseLevel: 0.8,
    variant: "v2",
    audioSrc: "assets/audio/tension-suspense.mp3",
    audioOffsetSeconds: 0,
    audioGain: 0.65,
  },
  v1: {
    hookLine1: "LE FILM AVAIT UN INDICE.",
    hookLine2: "PERSONNE NE L'A REMARQUÉ.",
    finalQuestion: "TU L'AS VU ?",
    cta: "kairosarchives.com",
    suspenseLevel: 0.8,
    variant: "v1",
    audioSrc: null,
    audioOffsetSeconds: 0,
    audioGain: 0.85,
  },
};
