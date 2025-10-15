
import React, { useState } from 'react';
import type { Member, Expense } from '../types';
import Button from './ui/Button';

interface AddExpenseFormProps {
    members: Member[];
    onAddExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
    onClose: () => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ members, onAddExpense, onClose }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState<number | string>('');
    const [paidById, setPaidById] = useState<string>(members[0]?.id || '');
    const [splitAmongIds, setSplitAmongIds] = useState<string[]>(members.map(m => m.id));
    const [error, setError] = useState('');

    const handleSplitChange = (memberId: string) => {
        setSplitAmongIds(prev =>
            prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericAmount = Number(amount);
        if (!description.trim() || numericAmount <= 0 || !paidById || splitAmongIds.length === 0) {
            setError('Please fill all fields correctly. Amount must be positive and at least one member must be selected for the split.');
            return;
        }
        onAddExpense({
            description,
            amount: numericAmount,
            paidById,
            splitAmongIds,
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-secondary">Description</label>
                <input id="description" type="text" value={description} onChange={e => setDescription(e.target.value)}
                    className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-text-secondary">Amount ($)</label>
                <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)}
                    className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm p-2"
                    step="0.01" min="0.01"
                />
            </div>
            <div>
                <label htmlFor="paidBy" className="block text-sm font-medium text-text-secondary">Paid by</label>
                <select id="paidBy" value={paidById} onChange={e => setPaidById(e.target.value)}
                    className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm p-2"
                >
                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                </select>
            </div>
            <div>
                <span className="block text-sm font-medium text-text-secondary">Split among</span>
                <div className="mt-2 space-y-2 max-h-40 overflow-y-auto p-2 border border-border rounded-md">
                    {members.map(m => (
                        <div key={m.id} className="flex items-center">
                            <input
                                id={`split-${m.id}`} type="checkbox"
                                checked={splitAmongIds.includes(m.id)}
                                onChange={() => handleSplitChange(m.id)}
                                className="h-4 w-4 text-primary bg-secondary border-border rounded focus:ring-primary"
                            />
                            <label htmlFor={`split-${m.id}`} className="ml-3 block text-sm text-text-primary">{m.name}</label>
                        </div>
                    ))}
                </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                <Button type="submit">Add Expense</Button>
            </div>
        </form>
    );
};

export default AddExpenseForm;
