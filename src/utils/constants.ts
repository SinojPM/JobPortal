import { AllallowedUsers } from "./interfaces"
export const passwordRegex:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/

export const allowedUsers:AllallowedUsers = {
    jobSeeker:"jobSeeker",
    employer:"employer",
    public:"public",
    all:"all",
}
