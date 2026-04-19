import { useMemo, useState } from 'react';
import Icon from '../components/Icon';
import SectionHeader from '../components/SectionHeader';
import { formatAmount } from '../utils/formatters';

function getInvoiceTone(status) {
  switch (status) {
    case 'paid':
      return 'green';
    case 'overdue':
      return 'rose';
    case 'sent':
      return 'indigo';
    default:
      return 'amber-soft';
  }
}

export default function InvoicesSection({ invoices, onDownload, onMarkPaid, onView }) {
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [invoiceFilter, setInvoiceFilter] = useState('all');

  const filteredInvoices = useMemo(() => {
    const query = invoiceSearch.trim().toLowerCase();

    return invoices.filter((invoice) => {
      const matchesFilter = invoiceFilter === 'all' ? true : invoice.status === invoiceFilter;
      const matchesQuery =
        !query ||
        invoice.id.toLowerCase().includes(query) ||
        invoice.customer.toLowerCase().includes(query) ||
        invoice.customerCode.toLowerCase().includes(query);

      return matchesFilter && matchesQuery;
    });
  }, [invoiceFilter, invoiceSearch, invoices]);

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid').length;
  const overdueInvoices = invoices.filter((invoice) => invoice.status === 'overdue').length;
  const outstandingAmount = invoices
    .filter((invoice) => invoice.status !== 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <>
      <SectionHeader title="Invoice Management" subtitle="Manage and track all invoices" />

      <section className="invoice-stats-grid">
        <article className="invoice-stat-card">
          <div className="invoice-stat-head">
            <span>Total Invoices</span>
            <Icon name="receipt" className="card-icon tone-blue" />
          </div>
          <strong>{totalInvoices}</strong>
        </article>
        <article className="invoice-stat-card">
          <div className="invoice-stat-head">
            <span>Paid</span>
            <Icon name="check" className="card-icon tone-green" />
          </div>
          <strong>{paidInvoices}</strong>
        </article>
        <article className="invoice-stat-card">
          <div className="invoice-stat-head">
            <span>Overdue</span>
            <Icon name="alert" className="card-icon tone-red" />
          </div>
          <strong>{overdueInvoices}</strong>
        </article>
        <article className="invoice-stat-card">
          <div className="invoice-stat-head">
            <span>Outstanding</span>
            <span className="invoice-currency-icon">$</span>
          </div>
          <strong>{formatAmount(outstandingAmount)}</strong>
        </article>
      </section>

      <section className="invoice-toolbar-card">
        <div className="invoice-toolbar">
          <div className="invoice-search-shell">
            <Icon name="search" className="invoice-search-icon" />
            <input
              className="invoice-search-input"
              type="text"
              value={invoiceSearch}
              onChange={(event) => setInvoiceSearch(event.target.value)}
              placeholder="Search by invoice number or customer..."
            />
          </div>

          <select className="shipment-select invoice-select" value={invoiceFilter} onChange={(event) => setInvoiceFilter(event.target.value)}>
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="sent">Sent</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </section>

      <section className="invoice-table-card">
        <div className="invoice-table">
          <div className="invoice-table-header" aria-hidden="true">
            <span>Invoice Number</span>
            <span>Customer</span>
            <span>Issue Date</span>
            <span>Due Date</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          <div className="invoice-table-body">
            {filteredInvoices.map((invoice) => (
              <div key={invoice.id} className="invoice-table-row">
                <div className="invoice-cell invoice-number-cell">
                  <Icon name="receipt" className="invoice-row-icon" />
                  <strong>{invoice.id}</strong>
                </div>

                <div className="invoice-cell">
                  <strong>{invoice.customer}</strong>
                  <span>{invoice.customerCode}</span>
                </div>

                <div className="invoice-cell invoice-date-cell">
                  <Icon name="calendar" className="invoice-inline-icon" />
                  <span>{invoice.issueDate}</span>
                </div>

                <div className="invoice-cell invoice-date-cell">
                  <Icon name="calendar" className="invoice-inline-icon" />
                  <div className="invoice-date-copy">
                    <span>{invoice.dueDate}</span>
                    {invoice.overdueLabel ? <small>{invoice.overdueLabel}</small> : null}
                  </div>
                </div>

                <div className="invoice-cell invoice-amount-cell">
                  <strong>{formatAmount(invoice.amount)}</strong>
                  <span>{invoice.shipments} shipments</span>
                </div>

                <div className="invoice-cell">
                  <span className={`shipment-status tone-${getInvoiceTone(invoice.status)}`}>{invoice.status}</span>
                </div>

                <div className="invoice-actions">
                  <button type="button" className="icon-action-button icon-only-action-button" aria-label={`View ${invoice.id}`} onClick={() => onView(invoice.id)}>
                    <Icon name="eye" className="shipment-management-action-icon" />
                  </button>
                  <button
                    type="button"
                    className="icon-action-button icon-only-action-button"
                    aria-label={`Download ${invoice.id}`}
                    onClick={() => onDownload(invoice.id)}
                  >
                    <Icon name="download" className="shipment-management-action-icon" />
                  </button>
                  {invoice.status !== 'paid' ? (
                    <button type="button" className="secondary-button compact-button invoice-settle-button" onClick={() => onMarkPaid(invoice.id)}>
                      Mark Paid
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
