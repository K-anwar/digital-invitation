export default function DressCode({ dressCode }) {
  if (!dressCode) return null;

  return (
    <div className="text-center space-y-3">
      <h3 className="text-2xl font-semibold"
        style={{ fontFamily: 'var(--font-title)', color: 'var(--primary-dark)' }}
      >
        🎨 Dress Code
      </h3>
      <div 
        className="inline-block px-6 py-4 rounded-2xl backdrop-blur-sm"
        style={{ backgroundColor: 'var(--bg-card)', boxShadow: 'var(--shadow)' }}
      >
        <p className="text-lg font-medium">{dressCode.color}</p>
        <p className="text-sm mt-2" style={{ color: 'var(--text-soft)' }}>
          {dressCode.description}
        </p>
      </div>
    </div>
  );
}