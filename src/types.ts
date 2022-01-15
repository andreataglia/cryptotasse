export enum Step {
    PRIMO = 1,
    SECONDO = 2,
    TERZO = 3,
}

export interface Guest {
    id: string
    firstName: string
    social: { mostUsed: string }
    lastName: string
    country: string
    email: string
    cellphone: string
    date: Date
    step: Step
    note: string
    hid: string
    image?: string
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
        (maybeGuest as Guest).email !== undefined &&
        (maybeGuest as Guest).note !== undefined &&
        (maybeGuest as Guest).date !== undefined &&
        (maybeGuest as Guest).step !== undefined &&
        (maybeGuest as Guest).hid !== undefined &&
        (maybeGuest as Guest).email !== undefined
    )
}
