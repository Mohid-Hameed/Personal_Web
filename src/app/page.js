import dynamic from 'next/dynamic';

const PortfolioLayout = dynamic(
  () => import('../components/layout/PortfolioLayout'),
  {
    loading: () => (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: '3px solid #e0e0e0',
            borderTopColor: '#1976d2',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
      </div>
    ),
    ssr: true,
  }
);

export default function Home() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <PortfolioLayout />
    </div>
  );
}
