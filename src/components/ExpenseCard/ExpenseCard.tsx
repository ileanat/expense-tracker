// src/components/ExpenseCard/ExpenseCard.tsx
'use client'

import React from 'react';

export type ExpenseCategory = "Food" | "Transportation" | "Entertainment" | 'Shopping' | "Other" ; 



// TypeScript interface defines the structure of props this component expects
// This acts like a contract - any parent component must provide these exact properties
export interface ExpenseCardProps {
  id: number;              // Unique identifier for each expense
  description: string;     // What the expense was for (e.g., "Lunch at Joe's Pizza")
  amount: number;         // Cost in dollars (will be formatted to show currency)   
  category: ExpenseCategory;
  date: string;          // When the expense occurred (formatted as string)

  // Optional props (can be provided or not)
  onDelete?: (id: number) => void;    // The ? makes it optional
  highlighted?: boolean;              // Component might be highlighted
  showCategory?: boolean;             // Category display might be hidden
}


/**
 * Displays a single expense item with formatted currency and professional styling
 * @param {Object} props - Component props
 * @param {number} props.id - Unique identifier for the expense entry
 * @param {string} props.description - Human-readable description of the expense
 * @param {number} props.amount - Expense amount in dollars (will be formatted as currency)
 * @param {string} props.category - Expense category for organization and filtering
 * @param {string} props.date - Date when expense occurred (ISO string format)
 */
const ExpenseCard: React.FC<ExpenseCardProps> = ({ 
  id, 
  description, 
  amount, 
  category, 
  date,
  highlighted = false,      // Default to false if not provided
  showCategory = true,      // Default to true if not provided
  onDelete 
}) => {

  // Format currency for professional display
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

  // Format date for user-friendly display
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
    //timeZone: "UTC"
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <article className={`
      bg-white rounded-lg p-4 mb-3 shadow-md
      hover:shadow-lg transition-all duration-200
      border-l-4 relative cursor-pointer
      ${highlighted ? 'border-l-orange-500 bg-orange-50' : 'border-l-blue-500'}
    `}>
      <div className="flex justify-between items-center mb-2">
        {showCategory && (
          <span className="inline-block bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase">
            {category}
          </span>
        )}
        <time className="text-sm text-gray-500" dateTime={date}>
          {formattedDate}
        </time>
      </div>
      
      <div className="space-y-4">
        <h3 className="mb-2 text-base font-medium text-gray-900">{description}</h3>
        <p className="m-0 text-lg font-bold text-green-600">{formattedAmount}</p>
      </div>
        
      {onDelete && (
        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            className="
              text-red-500 hover:text-white
              hover:bg-red-500
              border border-red-500
              rounded px-3 py-1
              text-sm font-medium
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-red-400
            "
            onClick={handleDelete}
            aria-label="Delete expense"
          >
            Delete
          </button>
        </div>
      )}
    </article>
  );
};

export default ExpenseCard;