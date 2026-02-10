import ConstellationBackground from '@/src/components/ConstellationBackground';

export default function ConstellationPage() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#000' }}>
      <ConstellationBackground opacity={1} />
    </div>
  );
}
