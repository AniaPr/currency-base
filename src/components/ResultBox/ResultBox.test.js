import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { convertPLNToUSD } from '../../utils/convertPLNToUSD';
import { convertUSDToPLN } from '../../utils/convertUSDToPLN';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from='PLN' to='USD' amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      { from: 'PLN', to: 'USD', amount: 100 },
      { from: 'PLN', to: 'USD', amount: 34 },
      { from: 'PLN', to: 'USD', amount: 9 },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from='PLN' to='USD' amount={testObj.amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(convertPLNToUSD(testObj.amount));
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    const testCases = [
      { from: 'USD', to: 'PLN', amount: 784 },
      { from: 'USD', to: 'PLN', amount: 58 },
      { from: 'USD', to: 'PLN', amount: 6 },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(convertUSDToPLN(testObj.amount));
      cleanup();
    }
  });

  it('should render proper info about equal values from, to', () => {
    const testCases = [
      { from: 'USD', to: 'USD', amount: 784 },
      { from: 'USD', to: 'USD', amount: 66 },
      { from: 'PLN', to: 'PLN', amount: 38 },
      { from: 'PLN', to: 'PLN', amount: 4 },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.amount);
      cleanup();
    }
  });

  it('should return proper info when given number is negative', () => {
    const testCases = [
      { from: 'PLN', to: 'USD', amount: -784 },
      { from: 'PLN', to: 'USD', amount: -2 },
      { from: 'USD', to: 'PLN', amount: -72 },
      { from: 'USD', to: 'PLN', amount: -9 },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('Wrong value...');
      cleanup();
    }
  });
});
