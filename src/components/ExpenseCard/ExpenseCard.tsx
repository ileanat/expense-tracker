// src/components/ExpenseCard/ExpenseCard.tsx
import React from 'react';

export type ExpenseCategory = "Food" | "Transportation" | "Entertainment" | "Other" ; 
type SortOption = "date" | "amount" | "category" ;



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
  });

  return (
    <article className="bg-white rounded-lg p-4 mb-3 shadow-md transition-all duration-200 border-l-4 border-blue-500">
      <div className="hover:-translate-y-0.5 hover:shadow-lg">
        <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase ">{category}</span>
        <time className="text-gray-500 text-xs" dateTime={date}>
          {formattedDate}
        </time>
      </div>

      <div className="expense-body">
        <h3 className="expense-description">{description}</h3>
        <p className="expense-amount">{formattedAmount}</p>
      </div>
    </article>
  );
};

export default ExpenseCard;