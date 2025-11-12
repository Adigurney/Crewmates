export default function StatsSummary({ crew }) {
  if (crew.length === 0) return null

 
  const categoryCounts = crew.reduce((acc, c) => {
    acc[c.category] = (acc[c.category] || 0) + 1
    return acc
  }, {})

  
  const success = Math.round(
    ((categoryCounts.mage || 0) + (categoryCounts.warrior || 0)) / crew.length * 100
  )

 
  return (
    <div
      style={{
        backgroundColor: success > 70 ? "#2bc2f4ff" : "#f7807cff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "20px",
      }}
    >
      <h3>Team Stats</h3>
      {Object.keys(categoryCounts).map(cat => (
        <p key={cat}>
          {cat}: {categoryCounts[cat]}
        </p>
      ))}
      <p>
        <strong>Success Metric:</strong> {success}%
      </p>
      <p style={{ color: success > 70 ? "green" : "red" }}>
        {success > 70
          ? "Your crew is thriving!"
          : "Your crew needs more balance!"}
      </p>
    </div>
  )
}