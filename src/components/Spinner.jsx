import React from 'react'

const Spinner = ({ size = 20 }) => {
  const s = size
  return (
    <div style={{ display: 'inline-block', width: s, height: s }} aria-hidden>
      <svg viewBox="0 0 50 50" style={{ width: s, height: s }}>
        <circle cx="25" cy="25" r="20" fill="none" stroke="#e6eef8" strokeWidth="6" />
        <path d="M45 25a20 20 0 0 1-20 20" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}

export default Spinner
