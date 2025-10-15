
// FIX: Added 'Expense' to the import to resolve type errors.
import type { Group, Balance, Settlement, Summary, Expense } from '../types';

// Mock data to simulate a backend
const MOCK_GROUPS: Group[] = [
  {
    id: 'group-1',
    name: 'Weekend Trip to Mountains',
    members: [
      { id: 'member-1', name: 'Alice' },
      { id: 'member-2', name: 'Bob' },
      { id: 'member-3', name: 'Charlie' },
      { id: 'member-4', name: 'Diana' },
    ],
    expenses: [
      {
        id: 'exp-1',
        description: 'Cabin Rental',
        amount: 300,
        paidById: 'member-1',
        splitAmongIds: ['member-1', 'member-2', 'member-3', 'member-4'],
        date: new Date().toISOString(),
      },
      {
        id: 'exp-2',
        description: 'Groceries',
        amount: 80,
        paidById: 'member-2',
        splitAmongIds: ['member-1', 'member-2', 'member-3', 'member-4'],
        date: new Date().toISOString(),
      },
      {
        id: 'exp-3',
        description: 'Gas',
        amount: 40,
        paidById: 'member-3',
        splitAmongIds: ['member-1', 'member-2', 'member-3'],
        date: new Date().toISOString(),
      },
       {
        id: 'exp-4',
        description: 'Dinner Out',
        amount: 120,
        paidById: 'member-4',
        splitAmongIds: ['member-1', 'member-4'],
        date: new Date().toISOString(),
      },
    ],
  },
  {
    id: 'group-2',
    name: 'Apartment Bills',
     members: [
      { id: 'member-5', name: 'Eve' },
      { id: 'member-6', name: 'Frank' },
    ],
    expenses: [],
  }
];

// In-memory store
let groupsStore: Group[] = JSON.parse(JSON.stringify(MOCK_GROUPS));

const simulateApiCall = <T,>(data: T, delay = 500): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), delay));
};

export const getGroups = (): Promise<Group[]> => {
    return simulateApiCall(groupsStore);
};

export const getGroupById = (groupId: string): Promise<Group | undefined> => {
    return simulateApiCall(groupsStore.find(g => g.id === groupId));
}

export const addGroup = (name: string, memberNames: string[]): Promise<Group> => {
    const newGroupId = `group-${Date.now()}`;
    const newMembers = memberNames.map((name, index) => ({ id: `member-${Date.now()}-${index}`, name }));
    const newGroup: Group = {
        id: newGroupId,
        name,
        members: newMembers,
        expenses: [],
    };
    groupsStore.push(newGroup);
    return simulateApiCall(newGroup);
};

export const addExpense = (groupId: string, expenseData: Omit<Expense, 'id' | 'date'>): Promise<Expense> => {
    const group = groupsStore.find(g => g.id === groupId);
    if (!group) {
        throw new Error('Group not found');
    }
    const newExpense: Expense = {
        ...expenseData,
        id: `exp-${Date.now()}`,
        date: new Date().toISOString(),
    };
    group.expenses.push(newExpense);
    return simulateApiCall(newExpense);
};

export const calculateSummary = (group: Group): Summary => {
    const memberBalances: { [key: string]: number } = {};
    group.members.forEach(member => {
        memberBalances[member.id] = 0;
    });

    group.expenses.forEach(expense => {
        const share = expense.amount / expense.splitAmongIds.length;
        memberBalances[expense.paidById] += expense.amount;
        expense.splitAmongIds.forEach(memberId => {
            memberBalances[memberId] -= share;
        });
    });

    const balances: Balance[] = Object.entries(memberBalances)
        .map(([memberId, amount]) => ({
            memberId,
            memberName: group.members.find(m => m.id === memberId)?.name || 'Unknown',
            amount,
        }))
        .filter(b => Math.abs(b.amount) > 0.01);

    // Settlement calculation
    const settlements: Settlement[] = [];
    const debtors = balances.filter(b => b.amount < 0).map(b => ({ ...b, amount: -b.amount })).sort((a, b) => b.amount - a.amount);
    const creditors = balances.filter(b => b.amount > 0).sort((a, b) => b.amount - a.amount);

    let debtorIndex = 0;
    let creditorIndex = 0;

    while (debtorIndex < debtors.length && creditorIndex < creditors.length) {
        const debtor = debtors[debtorIndex];
        const creditor = creditors[creditorIndex];
        const amount = Math.min(debtor.amount, creditor.amount);
        
        settlements.push({
            fromId: debtor.memberId,
            fromName: debtor.memberName,
            toId: creditor.memberId,
            toName: creditor.memberName,
            amount,
        });

        debtor.amount -= amount;
        creditor.amount -= amount;

        if (debtor.amount < 0.01) {
            debtorIndex++;
        }
        if (creditor.amount < 0.01) {
            creditorIndex++;
        }
    }
    
    return { balances, settlements };
};
