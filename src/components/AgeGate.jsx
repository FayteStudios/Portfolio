export default function AgeGate({ onConfirm, onBack }) {
  return (
    <div className="age-gate">
      <div className="age-gate-panel">
        <p className="age-gate-eyebrow">Content Warning</p>
        <h2>You must be 18 or older to view this page</h2>
        <p>This section contains mature artwork, including nudity, that isn't appropriate for all audiences.</p>

        <div className="age-gate-actions">
          <button type="button" className="age-gate-confirm" onClick={onConfirm}>
            I am 18 or older
          </button>
          <button type="button" className="age-gate-decline" onClick={onBack}>
            Take me back
          </button>
        </div>
      </div>
    </div>
  );
}
