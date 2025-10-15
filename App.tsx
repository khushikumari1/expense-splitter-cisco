import React, { useState, useEffect, useCallback } from 'react';
import type { Group, Expense, Summary } from './types';
import { getGroups, addGroup, addExpense, calculateSummary, getGroupById } from './services/expenseService';
import GroupList from './components/GroupList';
import GroupDetail from './components/GroupDetail';
import SummaryView from './components/SummaryView';
import Modal from './components/ui/Modal';
import AddGroupForm from './components/AddGroupForm';
import Button from './components/ui/Button';
import PlusIcon from './components/icons/PlusIcon';

type View = 'DASHBOARD' | 'GROUP_DETAIL' | 'SUMMARY';

const App: React.FC = () => {
    const [view, setView] = useState<View>('DASHBOARD');
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);

    const fetchAndSetGroups = useCallback(async () => {
        setIsLoading(true);
        try {
            const fetchedGroups = await getGroups();
            setGroups(fetchedGroups);
        } catch (err) {
            setError('Failed to fetch groups.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAndSetGroups();
    }, [fetchAndSetGroups]);

    const handleSelectGroup = async (groupId: string) => {
        setIsLoading(true);
        const group = await getGroupById(groupId);
        if (group) {
          setSelectedGroup(group);
          setView('GROUP_DETAIL');
        } else {
          setError(`Group with ID ${groupId} not found`);
          setView('DASHBOARD');
        }
        setIsLoading(false);
    };

    const handleBackToDashboard = () => {
        setView('DASHBOARD');
        setSelectedGroup(null);
        setSummary(null);
        fetchAndSetGroups(); // Refetch to show updated data
    };

    const handleBackToGroupDetail = () => {
        setView('GROUP_DETAIL');
        setSummary(null);
    };

    const handleViewSummary = () => {
        if (selectedGroup) {
            const calculatedSummary = calculateSummary(selectedGroup);
            setSummary(calculatedSummary);
            setView('SUMMARY');
        }
    };
    
    const handleAddGroup = async (name: string, members: string[]) => {
        await addGroup(name, members);
        fetchAndSetGroups();
        setIsAddGroupModalOpen(false);
    };

    const handleAddExpense = async (expenseData: Omit<Expense, 'id' | 'date'>) => {
        if (selectedGroup) {
            await addExpense(selectedGroup.id, expenseData);
            // Refresh group data
            const updatedGroup = await getGroupById(selectedGroup.id);
            if(updatedGroup) setSelectedGroup(updatedGroup);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center p-10">Loading...</div>;
        }
        if (error) {
            return <div className="text-center p-10 text-red-500">{error}</div>;
        }

        switch (view) {
            case 'GROUP_DETAIL':
                return selectedGroup && <GroupDetail group={selectedGroup} onAddExpense={handleAddExpense} onBack={handleBackToDashboard} onViewSummary={handleViewSummary} />;
            case 'SUMMARY':
                return summary && <SummaryView summary={summary} onBack={handleBackToGroupDetail} />;
            case 'DASHBOARD':
            default:
                return <GroupList groups={groups} onSelectGroup={handleSelectGroup} />;
        }
    };

    return (
        <div className="min-h-screen bg-background text-text-primary">
            <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-10">
                 <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-2xl font-bold tracking-tight text-primary">SplitEase</h1>
                        {view === 'DASHBOARD' && (
                            <Button onClick={() => setIsAddGroupModalOpen(true)} className="flex items-center space-x-2">
                                <PlusIcon className="w-5 h-5" />
                                <span>New Group</span>
                            </Button>
                        )}
                    </div>
                </div>
            </header>
            <main className="container mx-auto max-w-7xl p-4 md:p-6">
                {renderContent()}
            </main>
            <Modal isOpen={isAddGroupModalOpen} onClose={() => setIsAddGroupModalOpen(false)} title="Create a New Group">
                <AddGroupForm onAddGroup={handleAddGroup} onClose={() => setIsAddGroupModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default App;
