const faker = require('faker')
const { collection, doc, setDoc, addDoc } = require('firebase/firestore')
const { initializeApp } = require('firebase/app')

// Import the functions you need from the SDKs you need
const { getFirestore } = require('firebase/firestore')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyB0C8sDC03VCYjIiV0SX6vfi7m7n-dMzko',
    authDomain: 'network-marketing-2021.firebaseapp.com',
    projectId: 'network-marketing-2021',
    storageBucket: 'network-marketing-2021.appspot.com',
    messagingSenderId: '487579289722',
    appId: '1:487579289722:web:b79755581062446fc053c3',
    measurementId: 'G-7JEFFPW61V',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const mockGuestOnUser = (hostId) => {
    faker.setLocale('it')
    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()

    const step = faker.random.arrayElement([1, 2, 3])
    const benefit = faker.random.arrayElement(['energy', 'fatloss', 'focus'])
    const social = { mostUsed: faker.random.arrayElement(['Facebook', 'Instagram', 'Tik tok', 'Twitter']) }

    return {
        hid: hostId,
        step,
        benefit,
        firstName,
        lastName,
        social,
        country: faker.address.country(),
        email: faker.internet.email(firstName, lastName),
        cellphone: faker.phone.phoneNumber(),
        date: new Date(),
        note: '',
    }
}

const generateGuests = async (userNumber, hostId) => {
    console.log('Mocking user number:', userNumber)

    const newGuestRef = collection(db, 'guests')
    for (let i = 0; i < userNumber; i++) {
        try {
            const newGuest = mockGuestOnUser(hostId)
            const docRef = await addDoc(newGuestRef, newGuest)
            console.log('Document written with ID:', docRef.id)
        } catch (error) {
            console.log('Error while writing document', error)
        }
    }
    process.exit(0)
}

if (process.argv.length !== 4) {
    console.log('**************************************************************')
    console.log('*** Usage: yarn mock:guests <number of guests> <host-id>   ***')
    console.log('**** host-id is equal to user id of the database user      ***')
    process.exit(1)
}

generateGuests(parseInt(process.argv[2]), process.argv[3])
