// src/components/ExpenseList/ExpenseList.tsx
'use client'

import React, { useState } from 'react';
import ExpenseCard from '../ExpenseCard/ExpenseCard';

import type { ExpenseCardProps, ExpenseCategory } from 
'../ExpenseCard/ExpenseCard';


// Type for expense data (reusing interface from ExpenseCard)
type Expense = ExpenseCardProps;
type FilterOption = "All" | ExpenseCategory;

/**
 * Props interface for ExpenseList component
 * FIXED: expenses is now required (not optional initialExpenses)
 * @interface ExpenseListProps
 * @property {Expense[]} expenses - Current expense data from parent component (App.tsx)
 */
interface ExpenseListProps {
  expenses: Expense[];  // FIXED: Required prop, receives current state from App
  onDeleteExpense?: (id: number) => void;
}



/**
 * ExpenseList Component - FIXED VERSION
 * 
 * IMPORTANT CHANGE: This component no longer manages expense data in local state.
 * It receives expenses as props from App.tsx and only manages UI state (filtering).
 * 
 * This fixes the "duplicate state" bug where:
 * - App.tsx had expense state (updated by form)
 * - ExpenseList had separate expense state (never updated)
 * 
 * Now there's a SINGLE SOURCE OF TRUTH in App.tsx
 * 
 * @param {ExpenseListProps} props - Component props
 * @returns {JSX.Element} Rendered expense list with filtering controls
 */
const ExpenseList: React.FC<ExpenseListProps> = ({ 
  expenses, 
  onDeleteExpense 
}) => {
  
  // ONLY manage UI state (filtering) - NOT expense data
  const [filterCategory, setFilterCategory] = 
  useState<FilterOption>('All');

  // Filter expenses from props (not local state)
  const filteredExpenses = filterCategory === 'All' 
    ? expenses  // Use expenses from props
    : expenses.filter(expense => expense.category === filterCategory);

  // Calculate total for the currently filtered expenses
  const filteredTotal = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  /**
   * Handles category filter change from select dropdown
   * @param {React.ChangeEvent<HTMLSelectElement>} event - Select change event
   */
  const handleCategoryChange = (event: 
    React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value as FilterOption);
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-900">Your Expenses</h2>
        
        <div className="flex items-center gap-3">
          <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
            Filter by category:
          </label>
          <select 
            id="category-filter"
            value={filterCategory}
            onChange={handleCategoryChange}
            className="
              px-3 py-1.5 
              border border-gray-300 rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-sm bg-white cursor-pointer
              transition-colors duration-200
            "
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-700 font-medium">
          Total: <span className="text-lg font-bold text-green-600">${filteredTotal.toFixed(2)}</span>
        </p>
        <p className="text-sm text-gray-500">
          ({filteredExpenses.length} expenses)
        </p>
      </div>

      <div className="space-y-3">
        {filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No expenses found. Add some expenses to get started!
          </p>
        ) : (
          filteredExpenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              {...expense}
              onDelete={onDeleteExpense}
              highlighted={expense.amount > 50} // Highlight expensive items
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
