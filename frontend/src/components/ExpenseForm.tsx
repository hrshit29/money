// Responsive + Themed ExpenseForm.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { useGlobalContext } from '../context/GlobalContext';
import { useTheme } from '../context/ThemeContext';
import { Button } from './Button';
import { plus } from '../help/icons';

interface InputState {
  title: string;
  amount: string;
  date: Date | null;
  category: string;
  description?: string;
}

const FormWrapper = styled.div<{ themeMode: string }>`
  background: ${({ themeMode }) => (themeMode === 'dark' ? 'var(--glass-bg)' : 'var(--color-bg-alt)')};
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 16px var(--shadow-color);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: auto;

  @media (max-width: 640px) {
    padding: 1rem;
    border-radius: 12px;
  }
`;

const Label = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;

const InputBox = styled.div<{ themeMode: string }>`
  background: ${({ themeMode }) => (themeMode === 'dark' ? '#0f172a' : '#f8fafc')};
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 0.6rem 0.8rem;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ themeMode: string }>`
  width: 100%;
  background: transparent;
  border: none;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e2e8f0' : '#1e293b')};
  font-size: 1rem;
  outline: none;
`;

const Select = styled.select<{ themeMode: string }>`
  width: 100%;
  background: transparent;
  border: none;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e2e8f0' : '#1e293b')};
  font-size: 1rem;
  outline: none;
`;

const Textarea = styled.textarea<{ themeMode: string }>`
  width: 100%;
  background: transparent;
  border: none;
  resize: none;
  color: ${({ themeMode }) => (themeMode === 'dark' ? '#e2e8f0' : '#1e293b')};
  font-size: 1rem;
  outline: none;
`;

const ErrorText = styled.p`
  color: red;
  font-weight: 500;
`;

export default function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();
  const { theme } = useTheme();
  const [inputState, setInputState] = useState<InputState>({
    title: '',
    amount: '',
    date: null,
    category: '',
    description: '',
  });

  const handleInput = (name: keyof InputState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = () => {
    if (!inputState.date || !inputState.title || !inputState.amount) {
      return setError('Date, Title and Amount are required');
    }
    addExpense({
      ...inputState,
      amount: parseFloat(inputState.amount),
      date: inputState.date.toISOString(),
    });
    setInputState({ title: '', amount: '', date: null, category: '', description: '' });
  };

  return (
    <FormWrapper themeMode={theme}>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 600 }}>Add New Expense</h2>
      {error && <ErrorText>{error}</ErrorText>}
      <div>
        <Label>Title</Label>
        <InputBox themeMode={theme}><Input themeMode={theme} value={inputState.title} onChange={handleInput('title')} placeholder="Expense Title" /></InputBox>
      </div>
      <div>
        <Label>Amount</Label>
        <InputBox themeMode={theme}><Input themeMode={theme} type="number" value={inputState.amount} onChange={handleInput('amount')} placeholder="Amount" /></InputBox>
      </div>
      <div>
        <Label>Date</Label>
        <InputBox themeMode={theme}>
          <DatePicker selected={inputState.date} onChange={(date) => setInputState({ ...inputState, date })} placeholderText="Select Date" dateFormat="dd/MM/yyyy" className="w-full bg-transparent outline-none" />
        </InputBox>
      </div>
      <div>
        <Label>Category</Label>
        <InputBox themeMode={theme}>
          <Select themeMode={theme} value={inputState.category} onChange={handleInput('category')}>
            <option value="" disabled>Select Category</option>
            <option value="education">Education</option>
            <option value="groceries">Groceries</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="takeaways">Takeaways</option>
            <option value="clothing">Clothing</option>
            <option value="travelling">Travelling</option>
            <option value="other">Other</option>
          </Select>
        </InputBox>
      </div>
      <div>
        <Label>Reference</Label>
        <InputBox themeMode={theme}>
          <Textarea themeMode={theme} rows={3} value={inputState.description} onChange={handleInput('description')} placeholder="Add a Reference" />
        </InputBox>
      </div>
      <Button name="Add Expense" icon={plus} onClick={handleSubmit} bg="bg-red-600 hover:bg-red-700 active:bg-red-800" color="text-white" bPad="px-6 py-2" bRad="rounded-full" />
    </FormWrapper>
  );
}
