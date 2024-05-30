<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog as="div" class="fixed inset-0 flex z-40 md:hidden" @close="sidebarOpen = false">
                <TransitionChild
                    as="template"
                    enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </TransitionChild>
                <TransitionChild
                    as="template"
                    enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full"
                    enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leave-from="translate-x-0"
                    leave-to="-translate-x-full"
                >
                    <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                        <TransitionChild
                            as="template"
                            enter="ease-in-out duration-300"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="ease-in-out duration-300"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <div class="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    type="button"
                                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    @click="sidebarOpen = false"
                                >
                                    <span class="sr-only">Close sidebar</span>
                                    <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </TransitionChild>
                        <div class="flex-shrink-0 flex items-center px-4">Crypto.com Taxes</div>
                        <div class="mt-5 flex-1 h-0 overflow-y-auto">
                            <nav class="px-2 space-y-1">
                                <a
                                    v-for="item in navigation"
                                    :key="item.name"
                                    :href="item.href"
                                    :class="[
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                    ]"
                                >
                                    <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-4 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                                    {{ item.name }}
                                </a>
                            </nav>
                        </div>
                    </div>
                </TransitionChild>
                <div class="flex-shrink-0 w-14" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
                <div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 text-blue-400 font-extrabold">Crypto.com Taxes</div>
                <div class="flex-1 flex flex-col overflow-y-auto">
                    <nav class="flex-1 px-2 py-4 space-y-1">
                        <a
                            v-for="item in navigation"
                            :key="item.name"
                            :href="item.href"
                            :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']"
                        >
                            <component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                            {{ item.name }}
                        </a>
                    </nav>
                </div>
            </div>
        </div>
        <div class="md:pl-64 flex flex-col">
            <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
                <button type="button" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <MenuAlt2Icon class="h-6 w-6" aria-hidden="true" />
                </button>
                <div class="flex-1 px-4 flex justify-between">
                    <div class="flex-1 flex">
                        <form class="w-full flex md:ml-0" action="#" method="GET">
                            <label for="search-field" class="sr-only">Search</label>
                            <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                    <SearchIcon class="h-5 w-5" aria-hidden="true" />
                                </div>
                                <input
                                    id="search-field"
                                    class="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                                    placeholder="Search"
                                    type="search"
                                    name="search"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <main class="flex-1">
                <div class="py-6">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        <h1 class="text-2xl font-semibold text-gray-900">Calcola i valori dell'RW</h1>
                    </div>
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        <!-- Replace with your content -->
                        <div class="py-4">
                            Carica i csv di un anno, esportati da app crypto.com
                            <input type="file" id="dealCsv" />
                        </div>
                        Bilancio su crypto.com App a fine anno (dovrebbe essere se hai caricato tutto il 2023 31/12/2023):
                        <ul class="my-3 text-gray-800">
                            <li v-for="(v, k) in balances">{{ k }}: {{ v }}</li>
                        </ul>
                        <div class="p-4 bg-red-200">Cashout: {{ cashout }}</div>
                        <div class="p-4 bg-slate-200">Valore Iniziale: {{ valoreIniziale }}</div>
                        <div class="p-4 bg-slate-200">Valore Finale: {{ valoreFinale }}</div>

                        <div>
                            Da dove provengono i soldi? Dove sono stati inviati? Quale andamento hanno avuto? Sono stati monitorati gli investimenti? Sono stati rilevati i prelievi in RT? E’ stata
                            pagata l’imposta sostitutiva?
                        </div>
                        <!-- /End replace -->
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { Dialog, DialogOverlay, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { BellIcon, CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, MenuAlt2Icon, UsersIcon, XIcon } from '@heroicons/vue/outline'
import { SearchIcon } from '@heroicons/vue/solid'

const name = ref('')
const sidebarOpen = ref(false)

onMounted(() => {
    function uploadDealcsv() {}

    /*------ Method for read uploded csv file ------*/
    uploadDealcsv.prototype.getCsv = function (e: any) {
        let input = document.getElementById('dealCsv')
        input!.addEventListener('change', function () {
            // @ts-ignore
            if (this.files && this.files[0]) {
                // @ts-ignore
                var myFile = this.files[0]
                var reader = new FileReader()

                reader.addEventListener('load', function (e) {
                    // @ts-ignore
                    let csvdata = e.target.result
                    parseCsv.getParsecsvdata(csvdata) // calling function for parse csv data
                })

                reader.readAsBinaryString(myFile)
            }
        })
    }
    /*------- Method for parse csv data and display --------------*/
    uploadDealcsv.prototype.getParsecsvdata = function (data: any) {
        let parsedata = []

        let newLinebrk = data.split('\n')
        for (let i = 0; i < newLinebrk.length; i++) {
            parsedata.push(newLinebrk[i].split(','))
        }
        provaCsv(parsedata)
        calculateFinalValues()
    }
    // @ts-ignore
    var parseCsv = new uploadDealcsv()
    parseCsv.getCsv()
})

const balances = ref<Record<string, number>>({
    EUR: 0,
})
const cashout = ref(0)
const valoreIniziale = ref(0)
const valoreFinale = ref(0)

const provaCsv = (data: any[]) => {
    for (const raw of data) {
        processRaw(raw)
    }
}

const processRaw = (row: string[]) => {
    switch (row[9]) {
        case 'viban_purchase': // acquisto di crypto da fiat wallet
        case 'crypto_exchange': // trade tra crypto
            setInitialValueIfNone(row[2])
            setInitialValueIfNone(row[4])
            balances.value[row[2]] += parseFloat(row[3])
            balances.value[row[4]] += parseFloat(row[5])
            return
        case 'crypto_purchase': // acquisto di crypto con carta
            setInitialValueIfNone(row[2])
            balances.value[row[2]] += parseFloat(row[3])
            balances.value['EUR'] -= parseFloat(row[7])
            return
        case 'crypto_viban_exchange': // vendita crypto per eur su fiat wallet
            setInitialValueIfNone(row[2])
            balances.value[row[2]] += parseFloat(row[3])
            cashout.value += parseFloat(row[5])
            return
        case 'crypto_withdrawal': // withdraw crypto su wallet fuori
        case 'crypto_deposit': // deposito da fuori a wallet crypto
        case 'crypto_transfer':
            setInitialValueIfNone(row[2])
            balances.value[row[2]] += parseFloat(row[3])
            return
        default:
            return
    }
}

const setInitialValueIfNone = (key: string) => {
    if (!balances.value[key]) {
        balances.value[key] = 0
    }
}

const calculateFinalValues = () => {
    valoreIniziale.value = -balances.value['EUR']
    Object.keys(balances.value).forEach((k) => {
        if (k === 'EUR') return
        valoreFinale.value += getFinalYearPriceForToken(k, balances.value[k])
        console.log('token ', k)
    })
}

const getFinalYearPriceForToken = (token: string, amount: number) => {
    let price = 1
    switch (token) {
        case 'BTC':
            price = 42000
            break
        case 'CRO':
            price = 0.09
            break
        case 'ETH':
            price = 2200
            break
        default: // token not found
            price = 0
            break
    }
    return amount * price
}

const navigation = [{ name: 'Dashboard', href: '#', icon: HomeIcon, current: true }]
const userNavigation = [{ name: 'Settings', href: '#' }]
</script>
