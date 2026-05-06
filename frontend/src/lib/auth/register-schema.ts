import { z } from 'zod'

export const registerSchema = z.object({
    isOrg: z.boolean("Organization is required"),
    orgName: z.string().optional(),
    firstName: z.string().min(1,"First name is required"),
    lastName: z.string().min(1,"Last name is required"),
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
}).superRefine(
    (data,ctx)=>{
        if(data.isOrg && !data.orgName){
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:"Organization name is required",
                path:["orgName"]
            })
        }
    }
)

export type RegisterValues = z.infer<typeof registerSchema>

export type RegisterActionResult =
    | { ok: true }
    | { ok: false; formError?: string; fieldErrors?: Partial<Record<keyof RegisterValues, string>> }
