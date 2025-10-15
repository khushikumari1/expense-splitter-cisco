import React, { useState, useMemo } from 'react';
import type { Group, Expense } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import Modal from './ui/Modal';
import AddExpenseForm from './AddExpenseForm';
import PlusIcon from './icons/PlusIcon';
import { calculateSummary } from '../services/expenseService';
import ReceiptIcon from './icons/ReceiptIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface GroupDetailProps {
  group: Group;
  onAddExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  onBack: () => void;
  onViewSummary: () => void;
}

const GroupDetail: React.FC<GroupDetailProps> = ({ group, onAddExpense, onBack, onViewSummary }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getMemberName = (id: string) => group.members.find(m => m.id === id)?.name || 'Unknown';

  const groupBalances = useMemo(() => {
    return calculateSummary(group).balances;
  }, [group]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Button variant="secondary" onClick={onBack} className="flex items-center space-x-2 !px-3">
            <ChevronLeftIcon className="w-5 h-5"/> 
            <span>All Groups</span>
        </Button>
        <div className="flex space-x-2">
           <Button variant="secondary" onClick={onViewSummary}>View Settlement</Button>
           <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
             <PlusIcon className="w-5 h-5" />
             <span>Add Expense</span>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Expense List */}
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold">{group.name}</h2>
            {group.expenses.length === 0 ? (
                <Card>
                    <p className="text-text-secondary text-center py-10">No expenses logged yet. Add one to get started!</p>
                </Card>
            ) : (
                <div className="space-y-3">
                    {group.expenses.slice().reverse().map(expense => (
                        <Card key={expense.id} className="!p-4 flex items-center space-x-4">
                            <div className="flex flex-col items-center text-center">
                                <span className="text-xs text-text-secondary">{new Date(expense.date).toLocaleString('default', { month: 'short' })}</span>
                                <span className="text-xl font-bold">{new Date(expense.date).getDate()}</span>
                            </div>
                            <ReceiptIcon className="w-8 h-8 text-primary flex-shrink-0"/>
                            <div className="flex-grow">
                                <p className="font-semibold text-text-primary">{expense.description}</p>
                                <p className="text-sm text-text-secondary">
                                {getMemberName(expense.paidById)} paid
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-text-primary">${expense.amount.toFixed(2)}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>

        {/* Right Sidebar: Balances */}
        <div className="lg:col-span-1">
            <Card>
                <h3 className="text-xl font-bold mb-4">Group Balances</h3>
                <ul className="divide-y divide-border">
                    {groupBalances.length > 0 ? groupBalances.map(balance => (
                        <li key={balance.memberId} className="py-3 flex justify-between items-center">
                            <span className="font-medium">{balance.memberName}</span>
                            <span className={`font-semibold ${balance.amount >= 0 ? 'text-positive' : 'text-negative'}`}>
                            {balance.amount >= 0 ? `+ $${balance.amount.toFixed(2)}` : `- $${(-balance.amount).toFixed(2)}`}
                            </span>
                        </li>
                    )) : <p className="text-text-secondary">All balances are settled.</p>}
                </ul>
            </Card>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Expense">
        <AddExpenseForm
          members={group.members}
          onAddExpense={onAddExpense}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default GroupDetail;
