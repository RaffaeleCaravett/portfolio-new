export interface Item {
  nome: string;
  prezzo: number;
  ingredienti: string[];
  note?: string;
}

export interface addItem {
  add: boolean;
  item: Item;
}
