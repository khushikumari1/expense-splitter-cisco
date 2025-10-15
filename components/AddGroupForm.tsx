
import React, { useState } from 'react';
import Button from './ui/Button';

interface AddGroupFormProps {
  onAddGroup: (name: string, members: string[]) => void;
  onClose: () => void;
}

const AddGroupForm: React.FC<AddGroupFormProps> = ({ onAddGroup, onClose }) => {
  const [name, setName] = useState('');
  const [members, setMembers] = useState(['', '']);
  const [error, setError] = useState('');

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const addMemberField = () => {
    setMembers([...members, '']);
  };

  const removeMemberField = (index: number) => {
    if (members.length > 2) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredMembers = members.map(m => m.trim()).filter(m => m);
    if (!name.trim() || filteredMembers.length < 2) {
      setError('Group name is required and you need at least 2 members.');
      return;
    }
    onAddGroup(name, filteredMembers);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="groupName" className="block text-sm font-medium text-text-secondary">Group Name</label>
        <input
          id="groupName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2"
          placeholder="e.g., Beach Vacation"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text-secondary">Members</label>
        {members.map((member, index) => (
          <div key={index} className="flex items-center mt-2 space-x-2">
            <input
              type="text"
              value={member}
              onChange={(e) => handleMemberChange(index, e.target.value)}
              className="block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2"
              placeholder={`Member ${index + 1}`}
            />
            {members.length > 2 && (
              <button type="button" onClick={() => removeMemberField(index)} className="text-red-500 hover:text-red-400 font-bold">X</button>
            )}
          </div>
        ))}
        <Button type="button" variant="secondary" onClick={addMemberField} className="mt-2 w-full">
          Add Member
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit">Create Group</Button>
      </div>
    </form>
  );
};

export default AddGroupForm;
