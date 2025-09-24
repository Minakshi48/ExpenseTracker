import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import SummaryCards from './SummaryCards';
import TransactionForm from './TransactionForm';
import Filters from './Filters';
import TransactionList from './TransactionList';
import { useGetTransactionsQuery } from '../api/transactionApi';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#AA336A'];

export default function Dashboard() {
  const [filters, setFilters] = useState({});

  // Fetch all transactions for SummaryCards (ignore filters)
  const { data: allData, isLoading: loadingAll } = useGetTransactionsQuery({});
  const allItems = allData?.items || [];

  // Fetch filtered transactions for Table & Pie chart
  const { data: filteredData, isLoading: loadingFiltered, isError } = useGetTransactionsQuery(
    Object.fromEntries(Object.entries(filters || {}).filter(([_, v]) => v))
  );
  const items = filteredData?.items || [];

  // Total Income / Expense / Available Balance (unfiltered)
  const totalIncome = allItems.filter(t => t.type === 'income').reduce((a,b) => a+b.amount, 0);
  const totalExpense = allItems.filter(t => t.type === 'expense').reduce((a,b) => a+b.amount, 0);
  const availableBalance = totalIncome - totalExpense;

  // Pie chart: Available income slice + expenses by category
  const expenseByCategory = items.filter(t => t.type==='expense')
    .reduce((acc, t) => { acc[t.category] = (acc[t.category] || 0) + t.amount; return acc; }, {});

  let chartData = [];
  if (availableBalance > 0) chartData.push({ name: 'Available', value: availableBalance });
  chartData.push(...Object.entries(expenseByCategory).map(([name, value]) => ({ name, value })));

  if (isError) return <div>Error loading transactions</div>;

  return (
    <>
      {/* SummaryCards always show total */}
      <SummaryCards income={totalIncome} expense={totalExpense} />

      <Row className="mt-3">
        <Col md={6}>
          <TransactionForm totalIncome={totalIncome} totalExpense={totalExpense} />
          <Filters onChange={setFilters} />
        </Col>
        <Col md={6}>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name}: ${(percent*100).toFixed(0)}%`}
                  isAnimationActive={true}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>

      <div className="mt-3">
        {loadingFiltered ? "Loading..." : <TransactionList items={items} />}
      </div>
    </>
  );
}
