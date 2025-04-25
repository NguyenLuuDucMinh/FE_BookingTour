import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/tour">Tours</Link>
        <Link href="/user">User Dashboard</Link>
        <Link href="/admin">Admin Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
