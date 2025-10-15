import React from 'react';
import type { Summary } from '../types';
import Card from './ui/Card';
import Button from './ui/Button';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface SummaryViewProps {
  summary: Summary;
  onBack: () => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ summary, onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <Button variant="secondary" onClick={onBack} className="flex items-center space-x-2 !px-3">
             <ChevronLeftIcon className="w-5 h-5"/> 
             <span>Back to Group</span>
        </Button>
      </div>
      <h2 className="text-3xl font-bold text-center">Settlement Plan</h2>
      <p className="text-text-secondary text-center max-w-2xl mx-auto">
        Here is the most efficient way for everyone to settle their expenses. Each transaction clears a debt.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Balances */}
        <Card>
          <h3 className="text-xl font-bold mb-4">Final Balances</h3>
          <ul className="divide-y divide-border">
            {summary.balances.length > 0 ? summary.balances.map(balance => (
              <li key={balance.memberId} className="py-3 flex justify-between items-center">
                <span className="font-medium">{balance.memberName}</span>
                <span className={`font-bold ${balance.amount >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {balance.amount >= 0 ? `Is owed $${balance.amount.toFixed(2)}` : `Owes $${(-balance.amount).toFixed(2)}`}
                </span>
              </li>
            )) : <p className="text-text-secondary py-4 text-center">All balances are settled.</p>}
          </ul>
        </Card>

        {/* Settlements */}
        <Card>
          <h3 className="text-xl font-bold mb-4">Who Pays Whom</h3>
          {summary.settlements.length > 0 ? (
            <ul className="space-y-3">
                {summary.settlements.map((settlement, index) => (
                    <li key={index} className="bg-secondary p-4 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="font-semibold text-negative">{settlement.fromName}</span>
                            <ArrowRightIcon className="w-5 h-5 text-text-secondary"/>
                            <span className="font-semibold text-positive">{settlement.toName}</span>
                        </div>
                        <span className="font-bold text-lg">${settlement.amount.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
           ) : <p className="text-text-secondary py-4 text-center">Everyone is settled up!</p>}
        </Card>
      </div>
    </div>
  );
};

export default SummaryView;
