import React, { useState } from 'react';
import { Calculator, Banknote, Calendar, HelpCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '../data/companyInfo';

export const MortgageCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(450000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(22); // Typical Ghana commercial rate approx

  // Calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  let monthlyPayment = 0;
  if (monthlyInterestRate > 0 && numberOfPayments > 0 && loanPrincipal > 0) {
    monthlyPayment =
      (loanPrincipal *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
  }

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanPrincipal;

  const formatGHS = (val: number) => {
    return `GH₵ ${Math.round(val).toLocaleString('en-US')}`;
  };

  return (
    <section className="py-14 sm:py-20 bg-[#F8F7F4] border-b border-[#E7E7E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E7E7E7] shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E8] text-[#F36B21] text-xs font-semibold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Financial Planning Tool</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
                Ghana Property Installment & Mortgage Estimator
              </h2>

              <p className="text-sm text-[#555555]">
                Estimate your monthly commitment and initial deposit for purchasing land or residential property in Ghana.
              </p>

              <div className="space-y-4 pt-2">
                {/* Property Price Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#222222]">Property Value</label>
                    <span className="text-sm font-bold text-[#F36B21]">{formatGHS(propertyPrice)}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="3000000"
                    step="25000"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#DDE3E7] rounded-lg appearance-none cursor-pointer accent-[#F36B21]"
                  />
                  <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                    <span>GH₵ 50K</span>
                    <span>GH₵ 1.5M</span>
                    <span>GH₵ 3.0M+</span>
                  </div>
                </div>

                {/* Down payment */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#222222]">
                      Initial Down Payment ({downPaymentPercent}%)
                    </label>
                    <span className="text-sm font-bold text-[#222222]">{formatGHS(downPaymentAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#DDE3E7] rounded-lg appearance-none cursor-pointer accent-[#F36B21]"
                  />
                </div>

                {/* Grid for Loan Term & Estimated Rate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-xs font-bold text-[#222222] block mb-1.5">
                      Repayment Duration
                    </label>
                    <select
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(parseInt(e.target.value))}
                      className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#222222] focus:outline-none focus:border-[#F36B21]"
                    >
                      <option value={3}>3 Years (Developer Installment)</option>
                      <option value={5}>5 Years (Flexible Schedule)</option>
                      <option value={10}>10 Years (Medium Term)</option>
                      <option value={15}>15 Years (Bank Mortgage)</option>
                      <option value={20}>20 Years (Long Term)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#222222] block mb-1.5">
                      Estimated Annual Rate (%)
                    </label>
                    <input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                      min="0"
                      max="35"
                      step="0.5"
                      className="w-full bg-[#F8F7F4] border border-[#E7E7E7] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#222222] focus:outline-none focus:border-[#F36B21]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-[#222222] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#DDE3E7] font-semibold">
                    Estimated Monthly Payment
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#F36B21] mt-1 tracking-tight">
                    {formatGHS(monthlyPayment)}
                    <span className="text-xs text-[#DDE3E7] font-normal ml-1.5">/ month</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between text-[#DDE3E7]">
                    <span>Down Payment Required:</span>
                    <span className="font-bold text-white">{formatGHS(downPaymentAmount)}</span>
                  </div>
                  <div className="flex justify-between text-[#DDE3E7]">
                    <span>Principal Financed:</span>
                    <span className="font-bold text-white">{formatGHS(loanPrincipal)}</span>
                  </div>
                  <div className="flex justify-between text-[#DDE3E7]">
                    <span>Estimated Total Interest:</span>
                    <span className="font-bold text-white">{formatGHS(totalInterest > 0 ? totalInterest : 0)}</span>
                  </div>
                  <div className="flex justify-between text-[#DDE3E7]">
                    <span>Payment Period:</span>
                    <span className="font-bold text-white">{loanTermYears * 12} Months</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                <p className="text-[11px] text-gray-400">
                  *Estimates for illustration purposes. Distinct Pathway facilitates direct flexible developer installment plans on select properties.
                </p>
                <a
                  href={getWhatsAppLink(`Hello Distinct Pathway Real Estates, I ran an installment calculation for a property around ${formatGHS(propertyPrice)} and would like to discuss payment structures.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#F36B21] hover:bg-[#D95813] text-white py-3 rounded-xl font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Discuss Payment Options with an Agent</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
