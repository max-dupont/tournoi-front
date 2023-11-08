export interface Player {
    id?: number
    lastname: string,
    firstname: string,
    license: string,
    final_place?: number
}

export interface PlayerRanking {
    id?: number
    final_place?: number
}