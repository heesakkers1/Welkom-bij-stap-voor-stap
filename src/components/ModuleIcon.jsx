const icons = {
  sun: (
    <path
      d="M12 4v2M12 18v2M4 12H2M22 12h-2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  heart: (
    <path
      d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  barn: (
    <path
      d="M4 20V10l8-6 8 6v10H4zm0 0h16M9 20v-6h6v6M12 4v6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  shield: (
    <path
      d="M12 3 5 6v5c0 4.5 2.9 7.7 7 9 4.1-1.3 7-4.5 7-9V6l-7-3zm0 5v6m0 2.5h.01"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  people: (
    <path
      d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM3.5 19c.4-2.5 2.5-4 5.5-4s5.1 1.5 5.5 4M15 15c2.2.2 3.8 1.4 4.5 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  board: (
    <path
      d="M4 5h16v12H4V5zm4 16h8M12 17v4M8 9h8M8 12h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  horse: (
    <path
      d="M5 19c1-3 2-5 4-6 1.5-.8 3-.8 4.5 0 .8.4 1.5.4 2.2 0L18 11l1-3-2-1-1 2-2-1c-1-2-3-3-5-2-1.5.7-2.5 2-3 3.5C5 12 4 15 4 19h1zm10-8 2 3"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  tasks: (
    <path
      d="M9 6h11M9 12h11M9 18h11M5 6h.01M5 12h.01M5 18h.01"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  list: (
    <path
      d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  quiz: (
    <path
      d="M9 9a3 3 0 1 1 4.5 2.6c-.8.5-1.5 1.2-1.5 2.4v.5M12 18h.01M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  check: (
    <path
      d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm-1.5 9.5 2 2 4-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
}

function ModuleIcon({ name }) {
  return (
    <svg
      className="module-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name] ?? icons.sun}
    </svg>
  )
}

export default ModuleIcon
