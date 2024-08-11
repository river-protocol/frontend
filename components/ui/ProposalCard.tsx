"use client"
import React from 'react';

interface ProposalCardProps {
  imageSrc: string;
  name: string;
  description: string;
  creationDate: number; // Unix timestamp
  yesVotes: number;
  noVotes: number;
  amountRequested: string; // Amount in ETH
  onVote: () => void;
  onDelegate: () => void;
  onWithdraw: () => void;
  delegates: string[]
}

const ProposalCard: React.FC<ProposalCardProps> = ({
  imageSrc,
  name,
  description,
  creationDate,
  yesVotes,
  noVotes,
  amountRequested,
  onVote,
  onDelegate,
  onWithdraw,
  delegates
}) => {
  // Format creation date
  const formattedDate = new Date(creationDate * 1000).toLocaleDateString();

  return (
    <div className="flex border rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <img
        src={imageSrc}
        alt={name}
        className="w-1/5 object-cover"
      />

      {/* Details Section */}
      <div className="w-2/3 p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-white mb-2">{description}</p>
        <p className="text-white mb-2">Created on: {formattedDate}</p>
        <p className="text-white mb-2">Yes Votes: {yesVotes}</p>
        <p className="text-white mb-2">No Votes: {noVotes}</p>
        <p className="text-white mb-4">Amount Requested: {amountRequested} ETH</p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={onVote}
            className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
          >
            Vote
          </button>
          <button 
            onClick={onDelegate}
            className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
          >
            Delegate
          </button>
          <button 
            onClick={onWithdraw}
            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
          >
            Withdraw Funds
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProposalCard;
