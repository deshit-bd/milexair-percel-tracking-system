import { useState } from 'react';
import Icon from '../components/Icon';
import SectionHeader from '../components/SectionHeader';

const reportTabs = ['P&L Statement', 'Balance Sheet', 'Aging Report', 'Performance'];

const reportCards = [
  {
    label: 'Total Revenue',
    value: '$91,528.37',
    note: '+12.5% from last month',
    tone: 'green',
    icon: '$',
  },
  {
    label: 'Total Expenses',
    value: '$111,652.00',
    note: '+5.2% from last month',
    tone: 'red',
    iconName: 'trend',
  },
  {
    label: 'Net Profit',
    value: '$-20,123.63',
    note: 'Margin: -22.0%',
    tone: 'blue',
    iconName: 'chart',
  },
  {
    label: 'Outstanding AR',
    value: '$22,457.58',
    note: '5 pending invoices',
    tone: 'orange-dark',
    iconName: 'receipt',
  },
];

const profitLossMonths = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
const revenueSeries = [132500, 60500, 63774.08, 78000, 92000, 116000];
const expenseSeries = [56000, 78000, 83079.58, 74000, 73000, 43000];

function getPointY(value, maxValue = 140000) {
  const chartHeight = 170;
  const paddingTop = 16;
  return paddingTop + chartHeight - (value / maxValue) * chartHeight;
}

function buildCurvePath(values) {
  const points = values.map((value, index) => ({
    x: 40 + index * 176,
    y: getPointY(value),
  }));

  return points.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x} ${point.y}`;
    }

    const previous = points[index - 1];
    const controlX = (previous.x + point.x) / 2;
    return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
  }, '');
}

const agingBuckets = [
  { label: 'Current', amount: 7900.63 },
  { label: '1-30 Days', amount: 14556.95 },
  { label: '31-60 Days', amount: 0 },
  { label: '61-90 Days', amount: 0 },
  { label: '90+ Days', amount: 0 },
];

const performanceBuckets = [
  { label: 'Express', shipments: 35, revenue: 26000 },
  { label: 'Standard', shipments: 34, revenue: 21000 },
  { label: 'Economy', shipments: 40, revenue: 15000 },
  { label: 'Overnight', shipments: 41, revenue: 52000 },
];

export default function ReportsSection({ onExportDaily }) {
  const [activeTab, setActiveTab] = useState(reportTabs[0]);

  return (
    <>
      <SectionHeader
        title="Financial Reports"
        subtitle="Comprehensive financial analysis and reporting"
        action={
          <button type="button" className="secondary-button reports-export-button" onClick={onExportDaily}>
            <Icon name="download" className="reports-export-icon" />
            Export All
          </button>
        }
      />

      <section className="reports-stats-grid">
        {reportCards.map((card) => (
          <article key={card.label} className="reports-stat-card">
            <div className="reports-stat-head">
              <span>{card.label}</span>
              {card.icon ? (
                <span className={`reports-currency-mark tone-${card.tone}`}>{card.icon}</span>
              ) : (
                <Icon name={card.iconName} className={`card-icon tone-${card.tone}`} />
              )}
            </div>
            <strong>{card.value}</strong>
            <p className={`reports-stat-note tone-${card.tone}`}>{card.note}</p>
          </article>
        ))}
      </section>

      <section className="reports-tabs-wrap" aria-label="Financial report tabs">
        {reportTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`reports-tab${activeTab === tab ? ' is-active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </section>

      {activeTab === 'P&L Statement' ? (
        <section className="reports-panel-card">
          <div className="reports-panel-head">
            <h3>Profit &amp; Loss Statement</h3>
            <button type="button" className="secondary-button compact-button reports-panel-export">
              <Icon name="download" className="reports-export-icon" />
              Export PDF
            </button>
          </div>

          <div className="reports-chart-card">
            <svg viewBox="0 0 930 300" className="reports-line-chart" aria-label="Profit and loss line chart">
              {[0, 1, 2, 3, 4].map((row) => (
                <line key={`h-${row}`} x1="40" y1={16 + row * 42.5} x2="920" y2={16 + row * 42.5} className="reports-grid-line" />
              ))}
              {profitLossMonths.map((_, index) => (
                <line key={`v-${index}`} x1={40 + index * 176} y1="16" x2={40 + index * 176} y2="186" className="reports-grid-line reports-grid-line-vertical" />
              ))}

              <line x1="40" y1="16" x2="40" y2="186" className="reports-axis-stroke" />
              <line x1="40" y1="186" x2="920" y2="186" className="reports-axis-stroke" />

              <path d={buildCurvePath(revenueSeries)} className="reports-line reports-line-revenue" />
              <path d={buildCurvePath(expenseSeries)} className="reports-line reports-line-expenses" />

              {revenueSeries.map((value, index) => (
                <circle key={`revenue-${profitLossMonths[index]}`} cx={40 + index * 176} cy={getPointY(value)} r="3.2" className="reports-point reports-point-revenue" />
              ))}
              {expenseSeries.map((value, index) => (
                <circle key={`expenses-${profitLossMonths[index]}`} cx={40 + index * 176} cy={getPointY(value)} r="3.2" className="reports-point reports-point-expenses" />
              ))}

              {[140000, 105000, 70000, 35000, 0].map((value, index) => (
                <text key={value} x="0" y={22 + index * 42.5} className="reports-axis-label">
                  {value}
                </text>
              ))}

              {profitLossMonths.map((month, index) => (
                <text key={month} x={40 + index * 176} y="206" textAnchor="middle" className="reports-axis-label">
                  {month}
                </text>
              ))}
            </svg>

            <div className="reports-chart-legend">
              <span className="reports-legend-item tone-green">Revenue</span>
              <span className="reports-legend-item tone-red">Expenses</span>
            </div>
          </div>

          <div className="reports-breakdown-block">
            <section className="reports-revenue-block">
              <h4>Revenue Breakdown</h4>
              <div className="reports-revenue-list">
                <div>
                  <span>Domestic Shipments</span>
                  <strong>$50,978.26</strong>
                </div>
                <div>
                  <span>International Shipments</span>
                  <strong>$63,007.69</strong>
                </div>
                <div>
                  <span>Fuel Surcharge</span>
                  <strong>$8,979.83</strong>
                </div>
              </div>
              <div className="reports-revenue-total">
                <span>Total Revenue</span>
                <strong>$91,528.37</strong>
              </div>
            </section>

            <section className="reports-expense-block">
              <h4>Expense Breakdown</h4>
              <div className="reports-expense-chart-wrap">
                <div className="reports-expense-chart" aria-hidden="true" />
                <span className="reports-expense-label reports-expense-label-rent">Rent: 15%</span>
                <span className="reports-expense-label reports-expense-label-salaries">Salaries: 14%</span>
                <span className="reports-expense-label reports-expense-label-utilities">Utilities: 10%</span>
                <span className="reports-expense-label reports-expense-label-other">Other: 40%</span>
              </div>
            </section>
          </div>
        </section>
      ) : null}

      {activeTab === 'Balance Sheet' ? (
        <section className="reports-panel-card">
          <div className="reports-panel-head">
            <h3>Balance Sheet</h3>
            <button type="button" className="secondary-button compact-button reports-panel-export">
              <Icon name="download" className="reports-export-icon" />
              Export PDF
            </button>
          </div>

          <div className="balance-sheet-grid">
            <section className="balance-sheet-column">
              <h4>Assets</h4>
              <div className="balance-sheet-list">
                <div>
                  <span>Cash &amp; Bank</span>
                  <strong>$250,000.00</strong>
                </div>
                <div>
                  <span>Accounts Receivable</span>
                  <strong>$22,457.58</strong>
                </div>
                <div>
                  <span>Fixed Assets</span>
                  <strong>$500,000.00</strong>
                </div>
              </div>
              <div className="balance-sheet-total">
                <span>Total Assets</span>
                <strong>$772,457.58</strong>
              </div>
            </section>

            <section className="balance-sheet-column">
              <h4>Liabilities &amp; Equity</h4>
              <div className="balance-sheet-list">
                <div>
                  <span>Accounts Payable</span>
                  <strong>$125,000.00</strong>
                </div>
                <div>
                  <span>Long-term Debt</span>
                  <strong>$200,000.00</strong>
                </div>
                <div>
                  <span>Owner&apos;s Equity</span>
                  <strong>$447,457.58</strong>
                </div>
              </div>
              <div className="balance-sheet-total">
                <span>Total Liabilities &amp; Equity</span>
                <strong>$772,457.58</strong>
              </div>
            </section>
          </div>
        </section>
      ) : null}

      {activeTab === 'Aging Report' ? (
        <section className="reports-panel-card">
          <div className="reports-panel-head">
            <h3>Accounts Receivable Aging</h3>
            <button type="button" className="secondary-button compact-button reports-panel-export">
              <Icon name="download" className="reports-export-icon" />
              Export Excel
            </button>
          </div>

          <div className="aging-report-chart-card">
            <svg viewBox="0 0 930 320" className="reports-line-chart" aria-label="Accounts receivable aging chart">
              {[0, 1, 2, 3, 4].map((row) => (
                <line key={`aging-h-${row}`} x1="58" y1={18 + row * 53} x2="890" y2={18 + row * 53} className="reports-grid-line" />
              ))}
              {agingBuckets.map((_, index) => (
                <line key={`aging-v-${index}`} x1={90 + index * 176} y1="18" x2={90 + index * 176} y2="230" className="reports-grid-line reports-grid-line-vertical" />
              ))}

              <line x1="58" y1="18" x2="58" y2="230" className="reports-axis-stroke" />
              <line x1="58" y1="230" x2="890" y2="230" className="reports-axis-stroke" />

              {[16000, 12000, 8000, 4000, 0].map((value, index) => (
                <text key={value} x="10" y={24 + index * 53} className="reports-axis-label">
                  {value}
                </text>
              ))}

              {agingBuckets.map((bucket, index) => {
                const height = (bucket.amount / 16000) * 180;
                const x = 76 + index * 176;
                const y = 230 - height;

                return (
                  <g key={bucket.label}>
                    <rect x={x} y={y} width="140" height={height} className="aging-bar" />
                    <text x={146 + index * 176} y="248" textAnchor="middle" className="reports-axis-label">
                      {bucket.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="aging-chart-legend">
              <span className="aging-legend-swatch" />
              <span>Outstanding Amount</span>
            </div>
          </div>

          <div className="aging-breakdown-list">
            {agingBuckets.map((bucket) => (
              <div key={bucket.label}>
                <span>{bucket.label}</span>
                <strong>${bucket.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
              </div>
            ))}
          </div>

          <div className="aging-total-row">
            <span>Total Outstanding</span>
            <strong>$22,457.58</strong>
          </div>
        </section>
      ) : null}

      {activeTab === 'Performance' ? (
        <section className="reports-panel-card">
          <div className="reports-panel-head">
            <h3>Service Type Performance</h3>
          </div>

          <div className="performance-report-chart-card">
            <svg viewBox="0 0 930 320" className="reports-line-chart" aria-label="Service type performance chart">
              {[0, 1, 2, 3, 4].map((row) => (
                <line key={`performance-h-${row}`} x1="60" y1={18 + row * 53} x2="860" y2={18 + row * 53} className="reports-grid-line" />
              ))}
              {performanceBuckets.map((_, index) => (
                <line key={`performance-v-${index}`} x1={150 + index * 210} y1="18" x2={150 + index * 210} y2="230" className="reports-grid-line reports-grid-line-vertical" />
              ))}

              <line x1="60" y1="18" x2="60" y2="230" className="reports-axis-stroke performance-axis-left" />
              <line x1="860" y1="18" x2="860" y2="230" className="reports-axis-stroke performance-axis-right" />
              <line x1="60" y1="230" x2="860" y2="230" className="reports-axis-stroke" />

              {[60, 45, 30, 15, 0].map((value, index) => (
                <text key={`shipments-${value}`} x="30" y={24 + index * 53} className="reports-axis-label performance-axis-left">
                  {value}
                </text>
              ))}

              {[60000, 45000, 30000, 15000, 0].map((value, index) => (
                <text key={`revenue-${value}`} x="868" y={24 + index * 53} className="reports-axis-label performance-axis-right" textAnchor="start">
                  {value}
                </text>
              ))}

              {performanceBuckets.map((bucket, index) => {
                const baseX = 108 + index * 210;
                const shipmentHeight = (bucket.shipments / 60) * 180;
                const revenueHeight = (bucket.revenue / 60000) * 180;

                return (
                  <g key={bucket.label}>
                    <rect x={baseX} y={230 - shipmentHeight} width="82" height={shipmentHeight} className="performance-report-bar performance-report-bar-shipments" />
                    <rect x={baseX + 86} y={230 - revenueHeight} width="82" height={revenueHeight} className="performance-report-bar performance-report-bar-revenue" />
                    <text x={150 + index * 210} y="248" textAnchor="middle" className="reports-axis-label">
                      {bucket.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="performance-report-legend">
              <span className="performance-report-legend-item performance-report-legend-shipments">Shipments</span>
              <span className="performance-report-legend-item performance-report-legend-revenue">Revenue ($)</span>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
