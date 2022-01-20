export type Step = 1 | 2 | 3

export type Benefit = 'fatloss' | 'energy' | 'focus'

export interface Guest {
    id: string
    firstName: string
    social: { mostUsed: string }
    lastName: string
    country: string
    email?: string
    cellphone: string
    date: Date
    step?: Step
    benefit?: Benefit
    note?: string
    hid: string
}

export const isGuest = (maybeGuest: unknown): maybeGuest is Guest => {
    if (typeof maybeGuest !== 'object') {
        throw new Error('Is not an Object')
    }
    return (
        (maybeGuest as Guest).id !== undefined &&
        (maybeGuest as Guest).cellphone !== undefined &&
        (maybeGuest as Guest).firstName !== undefined &&
        (maybeGuest as Guest).lastName !== undefined &&
        (maybeGuest as Guest).social !== undefined &&
        (maybeGuest as Guest).country !== undefined &&
        (maybeGuest as Guest).date !== undefined &&
        (maybeGuest as Guest).step !== undefined &&
        (maybeGuest as Guest).hid !== undefined
    )
}
