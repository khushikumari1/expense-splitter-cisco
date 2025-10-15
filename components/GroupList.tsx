import React from 'react';
import type { Group } from '../types';
import Card from './ui/Card';
import UsersIcon from './icons/UsersIcon';

interface GroupListProps {
  groups: Group[];
  onSelectGroup: (groupId: string) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onSelectGroup }) => {
  if (groups.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-text-secondary">No groups yet. Create one to get started!</p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Your Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <Card
            key={group.id}
            className="cursor-pointer group hover:border-primary/80 hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => onSelectGroup(group.id)}
          >
            <div className="flex flex-col h-full">
                <div className="flex-grow">
                    <div className="flex items-center space-x-4 mb-3">
                        <div className="bg-secondary p-3 rounded-full">
                            <UsersIcon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-text-primary truncate">{group.name}</h3>
                    </div>
                    <p className="text-sm text-text-secondary line-clamp-2">
                        {group.members.length > 0 ? group.members.map(m => m.name).join(', ') : 'No members yet.'}
                    </p>
                </div>
                <div className="border-t border-border mt-4 pt-4 flex justify-between items-center text-sm text-text-secondary">
                    <span>{group.expenses.length} expenses</span>
                    <span className="text-primary font-semibold group-hover:underline">
                        View Details &rarr;
                    </span>
                </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupList;
