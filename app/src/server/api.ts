import axios, { AxiosResponse } from 'axios'
const api = axios.create({
	baseURL: 'http://192.168.0.9:3000'
})

export interface Root {
	ability: Ability
	is_hidden: boolean
	slot: number
}

export interface Ability {
	name: string
	url: string
}


export async function getPockemons(path: string) {
	return await api.get<Root>(`/${path} `)

}