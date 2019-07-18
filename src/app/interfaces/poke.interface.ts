export interface IPokeInterface {
    ID: number;
    canDelete: boolean;
    canVote: boolean;
    created: number;
    description: string;
    emoji: string;
    ratedPersonID: number;
    rating: number;
    voted: boolean;
    votes: number;
    voting?: boolean;
}

export interface IPostPokeInterface {
    ratedPersonID: number;
    rating: number;
    description: string;
    emoji: string;
}
