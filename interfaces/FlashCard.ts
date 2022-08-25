export interface CardData {
    term: string;
    definition: string;
    description?: string;
    isIscVerb?: boolean;
    isIrregularVerb?: boolean;
    isLocal?: boolean;
    conjugation?: {
      io: string;
      tu: string;
      lei: string;
      noi: string;
      voi: string;
      loro: string;
    }
}
