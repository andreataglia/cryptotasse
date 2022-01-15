import { db } from '../firebase'
import { collection, where, query } from 'firebase/firestore'

export const getGuestsQueryByHostId = (hostId: string) => {
    return query(collection(db, 'guests'), where('hid', '==', hostId))
}
