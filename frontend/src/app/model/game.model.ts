export interface Game {
    participants: any[];
    matches: Array<any>;
    startIndex: String;
    totalGames: String;
}

export interface History {
    endIndex: String;
    matches: any[];
    startIndex: String;
    totalGames: String;
}

export interface SpecGame {
    gameId: String;
    gameLength: String;
    gameMode: String;
    gameQueueConfigId: String;
    gameStartTime : String;
    gameType: String;
    mapId: String;
    observers: any;
    participants: Array<Participant>;
}

export interface Participant {
    bot: boolean;
    championId: String;
    role: String;
    perks: any;
    spell1Id: String;
    spell2Id: String;
    summonerId: String;
    summonerName: String;
    teamId: String;
}
