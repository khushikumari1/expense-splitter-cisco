
export interface Member {
  id: string;
  name: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  paidById: string;
  splitAmongIds: string[];
  date: string;
}

export interface Group {
  id: string;
  name: string;
  members: Member[];
  expenses: Expense[];
}

export interface Balance {
  memberId: string;
  memberName: string;
  amount: number;
}

export interface Settlement {
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
}

export interface Summary {
  balances: Balance[];
  settlements: Settlement[];
}
